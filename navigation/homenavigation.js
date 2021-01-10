import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Partituras from '../screens/partituras';
import Subjects from '../screens/subjects';
import Profile from '../screens/profile';
import Todo from '../screens/todo';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNavigation() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Subjects"
          activeColor="#FFFFFF"
          barStyle={Platform.OS === "ios" ? styles.btmBarIOS : styles.btmBar}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === 'Subjects') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Todo') {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              } else if (route.name === 'Partituras') {
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={25} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Subjects"
            component={Subjects}
            options={{
              tabBarLabel: 'Materias',
            }}
          />
          <Tab.Screen
            name="Todo"
            component={Todo}
            options={{
              tabBarLabel: 'Por Hacer',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Perfil',
            }}
          />
          <Tab.Screen
            name="Partituras"
            component={Partituras}
            options={{
              tabBarLabel: 'Partituras',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  btmBar: {
    backgroundColor: "#ffc107",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 4,
    position: "absolute",
    elevation: 4
  },
  btmBarIOS: {
    backgroundColor: "#ffc107",
    borderWidth: 1,
    marginTop: 10,
    elevation: 4
  }
});