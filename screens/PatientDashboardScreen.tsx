import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../types';

export default function PatientDashboardScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientDashboard'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.goodMorning}>Good morning,</Text>
      <Text style={styles.goodMorningName}>Oliver</Text>
      <Text style={styles.nurseAssigned}>Nurse Assigned: Alex</Text>
      <View style={styles.spacer}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientTestResults')}
        style={[styles.button, styles.testResultsButton]}>
        <Text style={styles.buttonText}>Check Test Results</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={[styles.button, styles.logOut]}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: Colors.patient.background,
  },
  spacer: {
    marginVertical: 100,
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
  logOut: {
    alignSelf: 'center',
  },
  testResultsButton: {
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  goodMorning: {
    left: "10%",
    fontSize: 36,
  },
  goodMorningName: {
    left: "10%",
    fontSize: 36,
    fontWeight: "bold",
  },
  nurseAssigned: {
    marginTop: 30,
    fontSize: 20,
    left: "10%",
  },
});
