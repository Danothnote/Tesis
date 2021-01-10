import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Subjects({ navigation }) {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [data, setData] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firestore()
            .collection('Classroms')
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    if ( documentSnapshot.data().type != 'course') {
                        for (const key in documentSnapshot.data()) {
                            if (key == 'students') {
                                if (documentSnapshot.data().students.includes(auth().currentUser.uid)) {
                                    data.push({
                                        ...documentSnapshot.data(),
                                        key: documentSnapshot.id,
                                    });
                                }
                            } if (key == 'parallels') {
                                for (const i in documentSnapshot.data().parallels) {
                                    if (documentSnapshot.data().parallels[i].includes(auth().currentUser.uid)) {
                                        data.push({
                                            ...documentSnapshot.data(),
                                            key: documentSnapshot.id,
                                        });
                                    }
                                }
                            }
                        }
                    }
                });
                setData(data);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#000' />
            <Text style={styles.title}> Materias </Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 70
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#fff35060"
    },
    itemName: {
        fontSize: 23,
        fontWeight: "bold"
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
});