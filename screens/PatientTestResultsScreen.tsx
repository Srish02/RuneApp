import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../types';

import PDFReader from 'rn-pdf-reader-js'

export default function PatientTestResults({ route, navigation }: StackScreenProps<RootStackParamList, 'PatientTestResults'>) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Test Results</Text>
      <PDFReader
        source={{
          uri: 'https://runefilestorage.blob.core.windows.net/tests/labresult.pdf',
        }}
        style={styles.pdf}
      />
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
    backgroundColor: Colors.patient.background,
  },
  title: {
    top: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: "blue"
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
  pdf: {
    width: 400,
  }
});
