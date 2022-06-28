import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Signup1 = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  nextStep,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-start' }}>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 18 }}>Name</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            padding: 8,
            borderRadius: 10,
          }}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          email={true}
        />
      </View>

      <View style={{ alignItems: 'flex-start' }}>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 18 }}>E-mail</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            padding: 8,
            borderRadius: 10,
          }}
          placeholder="Your e-mail"
          value={email}
          onChangeText={setEmail}
          email={true}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: 'flex-start',
        }}
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 18 }}>Password</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            padding: 8,
            borderRadius: 10,
          }}
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View
        style={{
          marginTop: 40,
          alignItems: 'flex-start',
        }}
      >
        <Button title="Next" onPress={nextStep} />
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Button
          title="Already have an account"
          onPress={() => navigation.navigate('Login')}
        />
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

export default Signup1;
