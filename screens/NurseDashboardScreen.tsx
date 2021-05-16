import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import { Text } from '../components/Themed';
import { RootStackParamList } from '../types';
import * as Notifications from 'expo-notifications';

export default function NurseDashboardScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'NurseDashboard'>) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://rune-rest-api.azurewebsites.net/api/patients')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.title, styles.setColorBlack]}>Patient List</Text> */}
      {/* <Image style={styles.tinyLogo} source={require('@expo/snack-static/react-native-logo.png')} /> */}
      <Image
        style={styles.profilepicture}
        source={{
          uri:
            'https://runeimages.blob.core.windows.net/assets/andrea.png',
        }}
      />

      <Text style={styles.goodMorning}>Good morning,</Text>
      <Text style={styles.goodMorningName}>Olivia</Text>
      <View style={styles.separator} />
      <Text style={styles.patientAssigned}>Patients Assigned:</Text>
      {isLoading ? <Text>Loading...</Text> :
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            //  <Text style={styles.setColorBlack}>{item.id}, {item.FirstName}, {item.token}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('NurseEditDetails', { itemId: item.id, token: item.ExpoNotificationToken })}
              style={styles.button}>
              <Text style={styles.buttonText}>{item.FirstName}</Text>
            </TouchableOpacity>
          )}
        />}
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
    backgroundColor: '#FAF1EF',
  },
  title: {
    top: 106,
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 120,
    height: 2,
    width: '80%',
  },
  setColorBlack: {
    color: '#000000'
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
  profilepicture: {
    right: -120,
    top: 50,
    width: 70,
    height: 70,
    borderRadius: 150 / 2,
  },
  goodMorning: {
    left: "-11.5%",
    top: 60,
    fontSize: 33,
    color: '#000000'
  },
  goodMorningName: {
    left: "-26%",
    top: 65,
    fontSize: 33,
    fontWeight: "bold",
    color: '#000000'
  },
  patientAssigned: {
    marginTop: -120,
    left: "-16%",
    fontSize: 20,
    color: '#000000'
  },
});
