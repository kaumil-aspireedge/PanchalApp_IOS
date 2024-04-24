import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  return (
    <View>
      <View>
        <Text>
          This is for testing purpose
          Vishw Prajapati
        </Text>
      </View>
    </View>
  )
}

export default App;