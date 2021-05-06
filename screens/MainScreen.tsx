import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Button, Alert, SafeAreaView, TouchableOpacity} from "react-native";

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;
export default function MainScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageStackStack}>
        <View style={styles.imageStack}>
          <Image
            source={require("../assets/images/group-medical-staff-carrying-health-related-icons_53876-43071.jpeg")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={styles.bigBlue}>{`Welcome to \nRune`}</Text>
          <SafeAreaView style={styles.container}></SafeAreaView>
        </View>
        <TouchableOpacity style={styles.fixToText} onPress={() => navigation.navigate('NurseLogin')}>
          <Text style={styles.buttonText}>Nurse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fixToText1} onPress={() => navigation.navigate('PatientLogin')}>
          <Text style={styles.buttonText}>Patient</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  image: {
    right: -84,
    top: 16,
    height: 263,
    width: 329,
  },
  bigBlue: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    height: 96,
    width: 915,
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    display:"flex",
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: "center",
    fontSize: 20,
  },
  imageStack: {
    top: 0,
    left: 0,
    width: 348,
    height: 661,
    position: "absolute"
  },
  imageStackStack: {
    width: 348,
    height: 661,
    marginTop: 85,
    marginLeft: 27
  },
  fixToText: {
    top: 450,
    left: 0,
    backgroundColor: '#AE3E3E',
    borderRadius: 20,
    height: 52,
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: "center",
  },
  fixToText1: {
    top: 470,
    left: 0,
    backgroundColor: '#4B74FF',
    borderRadius: 20,
    height: 52,
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
