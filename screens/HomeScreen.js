import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Welcome to the</Text>
      <Text style={{ fontSize: 20 }}>Sports Pal application</Text>
      <View style={styles.button}>
        <Button title="Find your sports pal" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 30,
  },
});

export default HomeScreen;
