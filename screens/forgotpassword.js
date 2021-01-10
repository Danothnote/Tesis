import React, { Component } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  sendEmail = () => {
    auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert("Se ha enviado un correo para reiniciar la contraseña")
        this.props.navigation.navigate('Login')
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
    }

  render() {
    return (
      <SafeAreaView style={styles.container} >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Reinicio de contraseña</Text>
          <Text style={styles.subtitle}>Coloque su correo a continuación</Text>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Correo'
            onChangeText={(email) => this.setState({ email })}
          />
          <TouchableOpacity style={styles.btn1} onPress={this.sendEmail}>
            <Text style={styles.txtBtn1}>Reiniciar contraseña</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: 60,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center"
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
    width: '80%',
    marginHorizontal: 20,
    marginVertical: 60,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ffc107",
    elevation: 5,
    backgroundColor: "#ffffff"
  },
  btn1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc107",
    width: 250,
    height: 40,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5
  },
  txtBtn1: {
    fontSize: 20,
    fontWeight: "bold"
  },
});