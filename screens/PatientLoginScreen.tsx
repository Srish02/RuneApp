import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import axios from 'axios'
import * as Notifications from 'expo-notifications';
import Colors from '../constants/Colors';

export default function PatientLoginScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientLogin'>) {
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");

  const handleSubmitPress = async () => {
    if (!fullName) {
      alert('Please fill full name.');
      return;
    }
    if (!id) {
      alert('Please fill id.');
      return;
    }

    await axios.get(`https://rune-rest-api.azurewebsites.net/api/patients/${id}`)
      .then(response => {
        if (response.data === "") {
          alert('Not a valid user ID.')
          throw new Error('Invalid user ID');
        } else {
          console.log(response);
          navigation.replace('PatientDashboard', { patientId: id });
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login</Text>
      <View style={styles.spacer}></View>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(fullName) => setFullName(fullName)}
        placeholder="Full Name"
        placeholderTextColor="#8b9cb5"
      />
      <TextInput
        style={styles.inputStyle}
        onChangeText={(id) => setId(id)}
        placeholder="ID" 
        placeholderTextColor="#8b9cb5"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <View style={styles.spacer}></View>
      <TouchableOpacity
        onPress={handleSubmitPress}
        style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.patient.background,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
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
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  setColorRed : {
    color: '#191970'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    // flex: 1,
    height: 50,
    width: '80%',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    fontSize: 20,
    backgroundColor: '#fff',
    margin: 10,
    alignSelf: 'center',
  },
  spacer: {
    marginVertical: 30,
  },
});

async function registerForPushNotificationsAsync() {
  return (await Notifications.getExpoPushTokenAsync()).data;
}

