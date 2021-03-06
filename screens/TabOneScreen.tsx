import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function TabOneScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'Splash'>) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.setColorRed]}>Patient Portal</Text>
      <View style={styles.separator} lightColor="#fff" darkColor="rgba(255,255,255,0.1)" />
      <Text style={[styles.body, styles.setColorRed]}>What would you like help with today?</Text>
      <View style={styles.separator} lightColor="#fff" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity
        // onPress={() => navigation.navigate('Page1')}
        style={styles.button}>
        <Text style={styles.buttonText}>Request medication refill</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Request physical therapy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigation.navigate('PatientList')}
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
    backgroundColor: 'white', 
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color:"#fff",
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
  },
  setColorRed : {
    color: '#191970'
  }
});
