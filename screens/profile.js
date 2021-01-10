import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [instrument, setInstrument] = useState();
  const [course, setCourse] = useState();
  const [parallel, setParallel] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Students')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        setName(documentSnapshot.data().name)
        setInstrument(documentSnapshot.data().instrument)
        setCourse(documentSnapshot.data().course)
        setParallel(documentSnapshot.data().parallel)
        setEmail(documentSnapshot.data().email)
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  changePsw = () => {
    auth().currentUser.updatePassword('123456')
  }

  signout = () => {
    auth().signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}> Perfil </Text>
        <Image style={styles.img} source={require('../assets/LogoCNM.png')} />
        <View>
          <Text style={styles.item}>{name}</Text>
          <Text style={styles.item}>{instrument}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.item}>{course} "</Text>
            <Text style={styles.item}>{parallel}"</Text>
          </View>
          <Text style={styles.item}>{email}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn1} onPress={changePsw}>
            <Text style={styles.txtBtn1}>Cambiar Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={signout}>
            <Text style={styles.txtBtn1}>Cerrar Sesión</Text>
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
  img: {
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
  item: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10
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
    fontWeight: "bold"
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