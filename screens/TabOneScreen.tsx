import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Portal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.body}>What would you like help with today?</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Request medication refill</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Request physical therapy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Check lab results</Text>
      </TouchableOpacity>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 0,
    width: '80%',
  },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 40,
    width: 300,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  }
});
