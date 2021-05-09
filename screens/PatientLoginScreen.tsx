import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import axios from 'axios'
import * as Notifications from 'expo-notifications';

export default function PatientLoginScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientLogin'>) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmitPress = async () => {
    setErrortext('');
    if (!firstName) {
      alert('Please fill firstName');
      return;
    }
    if (!lastName) {
      alert('Please fill lastName');
      return;
    }
    setLoading(true);

    const token = await registerForPushNotificationsAsync();
    axios.post('https://rune-rest-api.azurewebsites.net/api/patients', {
      "FirstName": firstName,
      "LastName": lastName,
      "ExpoNotificationToken": token,
    })
      .then(response => {
        console.log(response);
        navigation.replace('PatientDashboard');
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
      <Text style={styles.title}>Patient Login Screen</Text>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) =>
              setFirstName(UserEmail)
            }
            placeholder="Enter First Name"
            placeholderTextColor="#8b9cb5"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) =>
              setLastName(UserPassword)
            }
            placeholder="Enter Last Name" 
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      <TouchableOpacity
        onPress={handleSubmitPress}
        // onPress={() => navigation.navigate('PatientDashboard')}
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
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
});

async function registerForPushNotificationsAsync() {
  return (await Notifications.getExpoPushTokenAsync()).data;
}

