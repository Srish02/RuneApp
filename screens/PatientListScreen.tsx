import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
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
            <Text style={styles.setColorBlack}>{item.id}, {item.FirstName}, {item.LastName}</Text>
          )}
        />}
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
  }
});
