import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';

export default function PatientDashboardScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientDashboard'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Dashboard Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientTestResults')}
        style={styles.button}>
        <Text style={styles.buttonText}>Test Results</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
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
