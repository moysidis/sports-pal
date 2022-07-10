import React, { useEffect, useLayoutEffect, useContext, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import UsersContext from '../context/usersContext';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  getDoc,
} from 'firebase/firestore';

const LoadingScreen = ({ navigation, route }) => {
  const { usersState, setUsers, setCurrentUserData } = useContext(UsersContext);

  // Hide the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log('onAuthStateChanged');
  //     if (user) {
  //       console.log('user logged in', user);
  //       // if the user is signed in
  //       if (usersState.currentUser) {
  //         // move on to the next screen only if the curent user data have been set
  //         console.log('if currentUser goto TabView');
  //         navigation.replace('TabView');
  //       } else {
  //         return; // if the current user data are not set, exit for the moment
  //       } // in order to come back when they have been set
  //     } else {
  //       console.log('else Login');
  //       navigation.replace('Login');
  //     }
  //   });
  // }, [onAuthStateChanged, usersState, auth]);

  // // Check if the user is already logged in
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, 'users')),
  //     (snapshot) => {
  //       console.log('setUsers');
  //       setUsers(snapshot.docs); // get the user docs
  //       if (auth?.currentUser) {
  //         console.log('setCurrentUserData');
  //         setCurrentUserData(
  //           // get the currentuser data
  //           snapshot.docs
  //             .filter((user) => user.id === auth.currentUser.uid)[0]
  //             .data()
  //         );
  //       }
  //     },
  //     (error) => {
  //       console.log('error', error);
  //     }
  //   );

  //   return () => unsubscribe;
  // }, [auth]); // usersState

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(
          'Setting the current user data',
          usersState.userDocs.length
        );
        if (usersState.userDocs.length > 0) {
          const foundUser = usersState.userDocs.filter(
            (stateUser) => stateUser.id === user.uid
          )[0];
          setCurrentUserData(foundUser.data());
          navigation.replace('TabView');
        } else {
          return;
        }
      } else {
        navigation.replace('Login');
      }
    });

    return () => unsubscribe;
  });

  // Check if the user is already logged in
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'users')),
      (snapshot) => {
        setUsers(snapshot.docs); // get the user docs
      },
      (error) => {
        console.log('error', error);
      }
    );

    return () => unsubscribe;
  }, [usersState]); // , auth

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
