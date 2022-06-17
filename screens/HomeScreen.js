import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    });
    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/sportspal.png')}
        style={{ height: 250 }}
        resizeMode="contain"
      />
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

export default HomeScreen;
