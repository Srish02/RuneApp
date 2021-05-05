import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

import axios from 'axios'
import { Notifications as Notifications2 } from 'expo';

import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';

export default function NurseEditDetails({ route, navigation }: StackScreenProps<RootStackParamList, 'NurseEditDetails'>) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const { itemId } = route.params;

  const [value, onChangeText] = useState<string>();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // This listener is fired whenever a notification is received while the app is foregrounded
    Notifications2.addListener((data: any) => {
      console.log(data); 
    });
    fetch('https://rune-rest-api.azurewebsites.net/api/patients/'+`${itemId}`)
    .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (value: any) => {
    console.log(value)

    axios.put('https://rune-rest-api.azurewebsites.net/api/patient/'+`${itemId}`, {
      "TestResults":value
    })
      .then(response => {
        console.log(response);
        Alert.alert("Worked")
      })
      .catch(function (error) {
          console.log(error)
      });
    // navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.setColorBlack]}>Nurse Edit Details Screen</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <TouchableOpacity
        onPress={() => {handleClick(value);}}
        style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    top:-220,
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
  input: {
    height: 40,
    margin: 12,
    width:300,
    borderWidth: 1,
  },
  setColorBlack : {
    color: '#000000'
  },
});

async function registerForPushNotificationsAsync() {
  let token;
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
}
