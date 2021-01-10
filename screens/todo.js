import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Todo() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [data, setData] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('ToDo')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
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
      <Text style={styles.title}> Por Hacer </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemType}>{item.type}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemContent}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  itemType: {
    fontSize: 23,
    fontWeight: "bold"
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  itemContent: {
    fontSize: 18
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