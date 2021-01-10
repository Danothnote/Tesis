import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Signup({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState();
    const [instrument, setInstrument] = useState();
    const [instrumentList, setInstrumentList] = useState([]);
    const [course, setCourse] = useState();
    const [coursesList, setCoursesList] = useState([]);
    const [parallel, setParallel] = useState();
    const [courseIndex, setCourseIndex] = useState();
    const [parallelIndex, setParallelIndex] = useState();
    const [instrumentIndex, setInstrumentIndex] = useState([]);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [vpassword, setVpassword] = useState();

    useEffect(() => {
        const db = firestore()
            .collection('Classroms')
            .onSnapshot(querySnapshot => {
                const instrumentList = [];
                const coursesList = [];
                const parallelsList = []
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().type == 'instrument') {
                        instrumentList.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        })
                    }
                    if (documentSnapshot.data().type == 'parallel') {
                        parallelsList.push({
                            name: documentSnapshot.data().name,
                            key: documentSnapshot.id
                        })
                    }
                    const courseParallels = []
                    if (documentSnapshot.data().type == 'course') {
                        for (const key in documentSnapshot.data().parallels) {
                            for (const j in parallelsList) {
                                if (parallelsList[j].key == key) {
                                    courseParallels.push({
                                        name: parallelsList[j].name,
                                        key: parallelsList[j].key
                                    })
                                }
                            }
                        }
                        courseParallels.sort((a, b) => a.name.localeCompare(b.name))
                        coursesList.push({
                            name: documentSnapshot.data().name,
                            key: documentSnapshot.id,
                            parallels: courseParallels
                        })
                    }
                });
                instrumentList.sort((a, b) => a.name.localeCompare(b.name))
                setInstrumentList(instrumentList);
                coursesList.sort((a, b) => a.name.localeCompare(b.name))
                setCoursesList(coursesList);
                setInstrument(instrumentList[0].name);
                setInstrumentIndex(0);
                setCourse(coursesList[0].name);
                setCourseIndex(0);
                setParallel(coursesList[0].parallels[0].name);
                setParallelIndex(0);
                setLoading(false);
            });

        return () => {
            db();
        }
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    signup = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                auth().currentUser.sendEmailVerification()
            })
            .then((createUserDB))
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    alert('El correo no es válido');
                }
                if (error.code === 'auth/user-not-found') {
                    alert('Usuario no encontrado');
                }
                if (error.code === 'auth/wrong-password') {
                    alert('La contraseña no es correcta');
                }
                if (error.code === 'auth/email-already-in-use') {
                    alert('El usuario ya existe');
                }
                console.error(error);
            });
    }

    createUserDB = () => {
        firestore()
            .collection('Students')
            .doc(auth().currentUser.uid)
            .set({
                name: name,
                instrument: instrument,
                course: course,
                parallel: parallel,
                email: email,
                rol: 'student'
            })
            .then(() => {
                auth().signOut()
                alert('Por favor revise su correo para activar su cuenta')
                navigation.navigate('Login')
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    alert('El correo no es válido');
                }
                if (error.code === 'auth/user-not-found') {
                    alert('Usuario no encontrado');
                }
                if (error.code === 'auth/wrong-password') {
                    alert('La contraseña no es correcta');
                }
                console.error(error);
            });

        firestore()
            .collection('Classroms')
            .doc(instrumentList[instrumentIndex].key)
            .update({
                students: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)
            });
        firestore()
            .collection('Classroms')
            .doc(coursesList[courseIndex].key)
            .update({
                [`parallels.${coursesList[courseIndex].parallels[parallelIndex].key}`]: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)
            });
        firestore()
            .collection('Classroms')
            .doc('8Z5VbpeMBfFbRm96lB40')
            .update({
                students: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)
            });
        firestore()
            .collection('Classroms')
            .doc('DdIKnZaSajRU6WUVFC0J')
            .update({
                [`parallels.${coursesList[courseIndex].parallels[parallelIndex].key}`]: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)
            });
    }

    let pswrd;
    if (password != '' && vpassword != '') {
        if (password.length < 6) {
            pswrd = <Text style={{ color: "red", marginHorizontal: 30 }}>Son necesarios 6 caracteres como mínimo</Text>
        } else if (password == vpassword) {
            pswrd = <Text style={{ color: "green", marginHorizontal: 30 }}>Contraseñas correctas</Text>
        } else {
            pswrd = <Text style={{ color: "red", marginHorizontal: 30 }}>Las contraseñas no coinciden</Text>
        }
    }

    let btn1;
    if (name != '' && instrument != '' && course != '' && parallel != '' && email != '' && password != '' && password == vpassword) {
        btn1 = <TouchableOpacity style={styles.btn1} onPress={signup}>
            <Text style={styles.txtBtn1}>Registrarse</Text>
        </TouchableOpacity>
    } else {
        btn1 = <TouchableOpacity disabled={true} style={{ ...styles.btn1, backgroundColor: "#a69b9760", elevation: 0 }}>
            <Text style={{ ...styles.txtBtn1, color: "#00000060" }}>Registrarse</Text>
        </TouchableOpacity>
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                    <Text style={styles.title}>Registro</Text>
                    <Text style={styles.subtitle}>Por favor escriba todos sus datos</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Nombre completo'
                        onChangeText={(name) => setName(name)}
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            itemStyle={styles.pickerItem}
                            selectedValue={instrument}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) => {
                                setInstrument(itemValue)
                                setParallelIndex(itemIndex)
                            }}>
                            {instrumentList.map((item) => {
                                return (<Picker.Item key={item.key} label={item.name} value={item.name} />)
                            })}
                        </Picker>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                itemStyle={styles.pickerItem}
                                selectedValue={course}
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => {
                                    setCourse(itemValue)
                                    setCourseIndex(itemIndex)
                                }}>
                                {coursesList.map((item) => {
                                    return (<Picker.Item key={item.key} label={item.name} value={item.name} />)
                                })}
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                itemStyle={styles.pickerItem}
                                selectedValue={parallel}
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => {
                                    setParallel(itemValue)
                                    setParallelIndex(itemIndex)
                                }}>
                                {coursesList[courseIndex].parallels.map((item) => {
                                    return (<Picker.Item key={item.key} label={item.name} value={item.name} />)
                                })}
                            </Picker>
                        </View>
                    </View>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='Correo'
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        secureTextEntry={true}
                        passwordRules={'Mínimo 6 caracteres'}
                        placeholder='Contraseña'
                        onChangeText={(password) => setPassword(password)}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        secureTextEntry={true}
                        passwordRules={'Mínimo 6 caracteres'}
                        placeholder='Verificar Contraseña'
                        onChangeText={(vpassword) => setVpassword(vpassword)}
                    />
                    <View>
                        {pswrd}
                    </View>
                </View>
                <View style={styles.buttons}>
                    {btn1}
                    <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.txtBtn2}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flexGrow: 1,
        paddingVertical: 60,
        paddingBottom: 100,
        justifyContent: "space-between"
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        borderRadius: 100
    },
    title: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold"
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 10
    },
    input: {
        fontSize: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#ffc107",
        elevation: 5,
        backgroundColor: "#ffffff"
    },
    pickerItem: {
        fontSize: 20
    },
    pickerContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#ffc107",
        elevation: 5,
        backgroundColor: "#ffffff"
    },
    buttons: {
        alignItems: "center"
    },
    btn1: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffc107",
        width: 200,
        height: 40,
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5
    },
    txtBtn1: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    btn2: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffe082",
        width: 200,
        height: 40,
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5
    },
    txtBtn2: {
        fontSize: 20,
        fontWeight: "bold"
    }
});