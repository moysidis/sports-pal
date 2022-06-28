import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const MapScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useLayoutEffect(() => {
    console.log(auth);
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={signUserOut}>
          <SimpleLineIcons
            name="logout"
            size={26}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      <Text>MapScreen</Text>
      <Text>User: {currentUser && currentUser.email} </Text>
      <Text>User: {currentUser && currentUser.uid} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
});

export default MapScreen;
