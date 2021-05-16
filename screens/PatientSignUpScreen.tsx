import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import axios from 'axios'
import * as Notifications from 'expo-notifications';
import Colors from '../constants/Colors';

export default function PatientSignUpScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientSignUp'>) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [mrn, setMrn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmitPress = async () => {
    if (!firstName) {
      alert('Please fill First Name.');
      return;
    }
    if (!lastName) {
      alert('Please fill Last Name.');
      return;
    }
    if (!height) {
      alert('Please fill Height.');
      return;
    }
    if (!weight) {
      alert('Please fill Weight.');
      return;
    }
    if (!mrn) {
      alert('Please fill MRN.');
      return;
    }
    if (!dateOfBirth) {
      alert('Please fill Date Of Birth.');
      return;
    }

    const token = await registerForPushNotificationsAsync();
    axios.post('https://rune-rest-api.azurewebsites.net/api/patients', {
      "FirstName": firstName,
      "LastName": lastName,
      "Height": height,
      "Weight": weight,
      "MRN": mrn,
      "DateOfBirth": dateOfBirth,
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

  const handleDemoAutofill = () => {
    const firstNames = ['Olivia', 'Emma', 'Ava', 'Charlotte', 'Sophia', 'Amelia', 'Isabella', 'Mia', 'Evelyn', 'Harper', 'Liam', 'Noah', 'Oliver', 'Elijah', 'William', 'James', 'Benjamin', 'Lucas', 'Henry', 'Alexander'];
    const lastNames = ['Brown', 'Smith', 'Patel', 'Jones', 'Williams', 'Johnson', 'Taylor', 'Thomas', 'Roberts', 'Khan', 'Lewis', 'Jackson'];
    let padToSeven = (num: number) => num <= 9999999 ? `000000${num}`.slice(-7) : String(num);
    const randomYear = Math.floor(Math.random() * 50) + 49;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;

    setFirstName(firstNames[Math.floor(Math.random() * firstNames.length)]);
    setLastName(lastNames[Math.floor(Math.random() * lastNames.length)]);
    setHeight(Math.floor(Math.random() * 24) + 54);
    setWeight(Math.floor(Math.random() * 100) + 100);
    setMrn(padToSeven(Math.floor(Math.random() * 9999999)));
    setDateOfBirth(`${randomMonth}/${randomDay}/${randomYear}`)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Sign Up</Text>
      <View style={styles.spacer}></View>
      <TextInput
        value={firstName}
        style={styles.inputStyle}
        onChangeText={(firstName) => setFirstName(firstName)}
        placeholder="First Name"
        placeholderTextColor="#8b9cb5"
      />
      <TextInput
        value={lastName}
        style={styles.inputStyle}
        onChangeText={(lastName) => setLastName(lastName)}
        placeholder="Last Name" 
        placeholderTextColor="#8b9cb5"
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        value={height ? String(height) : ''}
        style={styles.inputStyle}
        onChangeText={(height) => setHeight(Number(height))}
        placeholder="Height (inches)" 
        placeholderTextColor="#8b9cb5"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        value={weight ? String(weight) : ''}
        style={styles.inputStyle}
        onChangeText={(weight) => setWeight(Number(weight))}
        placeholder="Weight (lbs)" 
        placeholderTextColor="#8b9cb5"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        value={mrn}
        style={styles.inputStyle}
        onChangeText={(mrn) => setMrn(mrn)}
        placeholder="MRN" 
        placeholderTextColor="#8b9cb5"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        value={dateOfBirth}
        style={styles.inputStyle}
        onChangeText={(dob) => setDateOfBirth(dob)}
        placeholder="Date of birth" 
        placeholderTextColor="#8b9cb5"
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      {/* <View style={styles.spacer}></View> */}
      <TouchableOpacity
        onPress={() => handleDemoAutofill()}
        // onPress={() => navigation.navigate('PatientDashboard')}
        style={styles.miniButton}>
        <Text style={styles.miniButtonText}>Autofill for demo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmitPress}
        // onPress={() => navigation.navigate('PatientDashboard')}
        style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
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
  miniButton: {
    padding: 15,
    margin: 10,
    backgroundColor: '#afa',
    borderWidth: 2,
    borderRadius: 40,
    alignSelf: 'center',
  },
  miniButtonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000'
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
    marginVertical: 15,
  }
});

async function registerForPushNotificationsAsync() {
  return (await Notifications.getExpoPushTokenAsync()).data;
}
