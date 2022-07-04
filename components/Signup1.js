import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const Signup1 = ({
  name,
  email,
  city,
  password,
  reenterPassword,
  setName,
  setEmail,
  setCity,
  setPassword,
  setReenterPassword,
  checkAndProceed,
  nextStep,
  navigation,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 20, top: 20 }}
        onPress={() => navigation.navigate('Login')}
      >
        <AntDesign name="arrowleft" size={34} color="black" />
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
        <Text style={{ fontSize: 34 }}>Sign Up</Text>
        <Text style={{ fontSize: 18 }}>
          Please enter your details to sign up
        </Text>
      </View>

      <View style={{ alignItems: 'flex-start' }}>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            height: 40,
            borderRadius: 7,
          }}
          value={name}
          onChangeText={setName}
          underlineColor={'transparent'}
          activeUnderlineColor={'white'}
        />
      </View>

      <View
        style={{
          marginTop: 10,
          alignItems: 'flex-start',
        }}
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>E-mail</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            height: 40,
            borderRadius: 7,
          }}
          value={email}
          onChangeText={setEmail}
          email={true}
          autoCapitalize="none"
          underlineColor={'transparent'}
          activeUnderlineColor={'white'}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: 'flex-start',
        }}
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>City/State</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            height: 40,
            borderRadius: 7,
          }}
          value={city}
          onChangeText={setCity}
          email={true}
          autoCapitalize="none"
          underlineColor={'transparent'}
          activeUnderlineColor={'white'}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: 'flex-start',
        }}
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Password</Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            height: 40,
            borderRadius: 7,
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisible}
          underlineColor={'transparent'}
          activeUnderlineColor={'white'}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>

      <View
        style={{
          marginTop: 10,
          alignItems: 'flex-start',
        }}
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Re-enter Password
          </Text>
        </View>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: 250,
            fontSize: 18,
            height: 40,
            borderRadius: 7,
          }}
          value={reenterPassword}
          onChangeText={setReenterPassword}
          secureTextEntry={passwordVisible}
          underlineColor={'transparent'}
          activeUnderlineColor={'white'}
        />
      </View>

      <View
        style={{
          marginTop: 40,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: 250,
            backgroundColor: '#ef3939',
            alignItems: 'center',
            borderRadius: 15,
            marginVertical: 10,
          }}
          // onPress={checkAndProceed}
          onPress={nextStep}
        >
          <Text
            style={{
              padding: 10,
              color: 'white',
              fontSize: 22,
              fontWeight: '500',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
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
