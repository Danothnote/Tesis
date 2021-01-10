import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import LogoutNavigation from './navigation/logoutnavigation';
import HomeNavigation from './navigation/homenavigation';

export default function App() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) {
            setInitializing(false)
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={require('./assets/LogoCNM.png')} />
                <Text style={styles.title}>Conservatorio Nacional de Música</Text>
            </SafeAreaView>
        )
    }

    if (user) {
        if (auth().currentUser.emailVerified) {
            return (
                <HomeNavigation />
            );
        } else {
            return (
                <LogoutNavigation />
            );
        }
    } else {
        return (
            <LogoutNavigation />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});