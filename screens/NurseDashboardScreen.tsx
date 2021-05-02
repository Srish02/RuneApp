import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
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
      <Text style={[styles.title, styles.setColorBlack]}>Patient List</Text>
      <View style={styles.separator} />
      {isLoading ? <Text>Loading...</Text> :
      <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <><Text style={styles.setColorBlack}>{item.id}, {item.FirstName}, {item.LastName}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('NurseEditDetails')}
                style={styles.button}>
                <Text style={styles.buttonText}>{item.FirstName}</Text>
              </TouchableOpacity></>
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
    backgroundColor: 'white',
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
  setColorBlack : {
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
  }
});
