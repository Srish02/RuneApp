import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Rune</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientLogin')}
        style={styles.button}>
        <Text style={styles.buttonText}>Patient</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('NurseLogin')}
        style={styles.button}>
        <Text style={styles.buttonText}>Nurse</Text>
      </TouchableOpacity>
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
