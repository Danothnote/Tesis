import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login = () => {
    if (this.state.email != '' && this.state.password != '') {
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('User signed in!');
        if (!auth().currentUser.emailVerified) {
          auth().signOut()
          alert('Por favor revise su correo para activar su cuenta')
        } else {
          this.props.navigation.navigate('Login')
        }
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
    } else {
      alert('Por favor ingrese sus datos')
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#000"/>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View>
            <Image style={styles.logo} source={require('../assets/LogoCNM.png')} />
          </View>
          <View>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Por favor escriba sus credenciales</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='Correo'
              onChangeText={(email) => this.setState({ email })}
            />
            <TextInput
              style={styles.input}
              keyboardType='default'
              secureTextEntry={true}
              passwordRules={'Mínimo 6 caracteres'}
              placeholder='Contraseña'
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn1} onPress={this.login}>
              <Text style={styles.txtBtn1}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.txtBtn2}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
              <Text>Olvidé mi Contraseña</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 15,
    paddingVertical: 15,
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