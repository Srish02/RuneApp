import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Button, Alert, SafeAreaView, TouchableOpacity} from "react-native";

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Colors from '../constants/Colors'

type Props = StackScreenProps<RootStackParamList, 'PatientLoginOrSignup'>;

export default function PatientLoginOrSignupScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Welcome to Rune\nPatient Portal`}</Text>
      <View style={styles.spacer}></View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatientLogin')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatientSignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.spacer}></View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.patient.background,
    justifyContent: "center",
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 40,
    width: 300,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    textAlign: "center",
    fontSize: 20,
  },
  spacer: {
    marginVertical: 50,
  },
});
