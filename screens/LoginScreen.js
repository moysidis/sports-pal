import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/sportspal.png')}
        style={{ height: 120 }}
        resizeMode="contain"
      />
      <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 50 }}>
        <Text style={{ fontSize: 34 }}>Welcome Back!</Text>
        <Text style={{ fontSize: 18 }}>Please login to continue</Text>
      </View>

      <View style={{ alignItems: 'flex-start' }}>
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
          placeholder="Your e-mail"
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
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          underlineColor={'transparent'}
          activeUnderlineColor={'white'}
        />
      </View>

      <TouchableOpacity
        style={{
          width: 250,
          alignItems: 'flex-end',
        }}
        onPress={() => {
          if (email) {
            try {
              sendPasswordResetEmail(auth, email)
                .then(() =>
                  Alert.alert(
                    'Reseting Password',
                    'A link has been send to your email to reset your password'
                  )
                )
                .catch((error) =>
                  Alert.alert(
                    'Password Reseting Problem',
                    'There is no account with this email'
                  )
                );
            } catch (error) {
              Alert.alert('Password Reseting Problem', error.message);
            }
          } else {
            Alert.alert(
              'Reseting Password',
              'Please type your email address in the corresponding field'
            );
            console.log('error message');
          }
        }}
      >
        <View>
          <Text style={styles.resetText}>Forgot Password?</Text>
        </View>
      </TouchableOpacity>

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
          onPress={handleLogin}
        >
          <Text
            style={{
              padding: 10,
              color: 'white',
              fontSize: 22,
              fontWeight: '500',
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 210,
            backgroundColor: 'grey',
            alignItems: 'center',
            borderRadius: 15,
            marginVertical: 5,
          }}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text
            style={{
              padding: 7,
              color: 'white',
              fontSize: 22,
              fontWeight: '500',
            }}
          >
            Create account
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

export default LoginScreen;
