import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const LoadingScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      navigation.replace(user ? 'TabView' : 'Login');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/sportspal.png')}
        style={{ height: 250 }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    margin: 30,
  },
});

export default LoadingScreen;
