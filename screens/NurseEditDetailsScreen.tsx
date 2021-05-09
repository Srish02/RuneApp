import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Alert, Platform, FlatList } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications'

import axios from 'axios'
import Constants from 'expo-constants';
import { Notifications as Notifications2, Permissions } from 'expo';

import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';

export default function NurseEditDetails({ route, navigation }: StackScreenProps<RootStackParamList, 'NurseEditDetails'>) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();
  const notificationListener = useRef();

  const { itemId, token } = route.params;

  const [value, onChangeText] = useState<string>();

  useEffect(() => {
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
        //console.log(response);
        // console.log(token);
        registerForPushNotificationsAsync(token).then(token => setExpoPushToken(token));
        Notifications2.addListener((data: any) => {
          console.log(data); 
        });
        console.log("api being called");
        sendPushNotification(token);
        // console.log("api being called");
        // sendPushNotification(expoPushToken);
        // async () => {
        //   await sendPushNotification(expoPushToken);
        // }       
      })
      .catch(function (error) {
          console.log(error)
      });
      navigation.goBack();
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

function sendPushNotification(expoPushToken: String) {
  console.log(expoPushToken);
  axios.post('https://exp.host/--/api/v2/push/send', {
    "to": `${expoPushToken}`,
    "title": "Notification",
    "body": "Lab results are updated"
    }).then(resp=>{
      console.log(resp.data);
    })  
    .catch(error=>{
      console.log(error);
    });
  // const message = {
  //   to: expoPushToken,
  //   title: 'Notification',
  //   body: 'Lab results are updated',
  //   data: { message: '${title} - ${body}' },
  // };
  // console.log("workig")
  // await fetch('https://exp.host/--/api/v2/push/send', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(message),
  // });
}

async function registerForPushNotificationsAsync(token: any) {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
