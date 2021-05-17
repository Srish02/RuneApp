import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../types';
import axios from 'axios'
import { useEffect, useState } from 'react';

export default function PatientDashboardScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientDashboard'>) {
  const { patientId } = route.params;
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    fetch(`https://rune-rest-api.azurewebsites.net/api/patients/${patientId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json)
      })
      .catch((error) => console.error(error))
  }, []);
  
  const handleHelpPress = async () => {
    axios.post(`https://rune-rest-api.azurewebsites.net/api/patients/${patientId}/help`)
      .then(response => {
        console.log(response);
        alert('A nurse is on their way!');
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
      { data && <>
        <Text style={styles.goodMorning}>Good morning,</Text>
        <Text style={styles.goodMorningName}>{data.FirstName}</Text>
        <Text style={styles.nurseAssigned}>Nurse Assigned: Olivia</Text>
        <View style={styles.spacer}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PatientTestResults')}
          style={styles.button}>
          <Text style={styles.buttonText}>Check Test Results</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHelpPress}
          style={[styles.button, styles.helpButton]}>
          <Text style={[styles.buttonText, styles.helpButtonText]}>Request Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        </>
      }
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
    alignSelf: 'center',
  },
  helpButton: {
    backgroundColor: '#f55',
  },
  helpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
