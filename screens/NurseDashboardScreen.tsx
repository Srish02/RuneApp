import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import { Text } from '../components/Themed';
import { RootStackParamList } from '../types';

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
      <View style={{ flexDirection: 'row', padding: 30, marginTop: 50 }}>
        <View style={{ flexDirection: 'column', flex: 2 }}>
          <Text style={styles.goodMorning}>Good morning,</Text>
          <Text style={styles.goodMorningName}>Olivia</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <Image
            style={styles.profilepicture}
            source={{
              uri:
                'https://runeimages.blob.core.windows.net/assets/andrea.png',
            }}
          />
        </View>
      </View>

      <View style={styles.separator} />
      <Text style={styles.patientAssigned}>Patients Assigned:</Text>
      {isLoading ? <Text>Loading...</Text> :
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          style={{ margin: 20 }}
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
    marginVertical: 20,
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
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 150 / 2,
  },
  goodMorning: {
    fontSize: 33,
    color: '#000000'
  },
  goodMorningName: {
    fontSize: 33,
    fontWeight: "bold",
    color: '#000000'
  },
  patientAssigned: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    fontSize: 20,
    color: '#000000'
  },
});
