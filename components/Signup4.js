import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Signup4 = ({ interests, setInterests, handleSignup, previousStep }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>Interests</Text>
      <TextInput
        style={{
          backgroundColor: 'lightgrey',
          width: 250,
          fontSize: 18,
          padding: 8,
          borderRadius: 10,
        }}
        placeholder="Tell us more about you"
        value={interests}
        onChangeText={setInterests}
        secureTextEntry
      />
      <View
        style={{
          marginTop: 40,
          alignItems: 'flex-start',
        }}
      >
        <Button title="Previous" onPress={previousStep} />
        <Button title="Finish" onPress={handleSignup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup4;
