import React, { useEffect, useLayoutEffect, useContext, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import UsersContext from '../context/usersContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const LoadingScreen = ({ navigation }) => {
  const {
    usersState,
    setUsers,
    setCurrentUserData,
    setCurrentUserMessages,
    addToCurrentUserMessages,
  } = useContext(UsersContext);

  // Hide the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

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
          if (foundUser) {
            setCurrentUserData(foundUser.data());
            console.log('Current User', user.uid, user.displayName);
            navigation.navigate('TabView');
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe;
  }, [usersState.userDocs]);

  // Check if the user is already logged in
  useLayoutEffect(() => {
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
  }, []); // , auth

  // useLayoutEffect(() => {
  //   if (auth?.currentUser?.uid) {
  //     const q = query(
  //       collection(db, 'chats'),
  //       where('user._id', '==', auth?.currentUser?.uid)
  //     );

  //     const unsubscribe = onSnapshot(
  //       q,
  //       (snapshot) =>
  //         setCurrentUserMessages(
  //           snapshot.docs.map((doc) => ({
  //             _id: doc.data()._id,
  //             createdAt: doc.data().createdAt.toDate(),
  //             text: doc.data().text,
  //             user: doc.data().user,
  //             recipientId: doc.data().recipientId,
  //           }))
  //         ),
  //       (error) => {
  //         console.log('User messages error', error);
  //       }
  //     );

  //     return () => unsubscribe;
  //   }
  // }, [auth?.currentUser?.uid]);

  // useLayoutEffect(() => {
  //   if (auth?.currentUser?.uid) {
  //     const q = query(
  //       collection(db, 'chats'),
  //       where('recipientId', '==', auth?.currentUser?.uid)
  //     );

  //     const unsubscribe = onSnapshot(
  //       q,
  //       (snapshot) =>
  //         addToCurrentUserMessages(
  //           snapshot.docs.map((doc) => ({
  //             _id: doc.data()._id,
  //             createdAt: doc.data().createdAt.toDate(),
  //             text: doc.data().text,
  //             user: doc.data().user,
  //             recipientId: doc.data().recipientId,
  //           }))
  //         ),
  //       (error) => {
  //         console.log('User messages error', error);
  //       }
  //     );

  //     return () => unsubscribe;
  //   }
  // }, [auth?.currentUser?.uid]);

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
