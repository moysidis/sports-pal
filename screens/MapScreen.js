import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
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

const MapScreen = ({ navigation, route }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'users')),
      (snapshot) => {
        setUsers(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [route]);

  useEffect(() => {
    const curUser = users.filter((user) => user.id === currentUser.uid);
    setCurrentUserData(curUser[0]?.data());
  }, [users]);

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
    <View style={{}}>
      <MapView
        style={{ height: '100%' }}
        initialRegion={{
          latitude: currentUserData?.location?.latitude,
          longitude: currentUserData?.location?.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {users.map((doc, index) => {
          if (doc.data().location)
            return (
              <Marker
                key={index}
                coordinate={doc.data().location}
                title={doc.data().name}
                description={
                  doc.data().sports ? doc.data().sports.join(', ') : ''
                }
              >
                <Callout
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      {doc.data().name}
                    </Text>
                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>
                      Sports
                    </Text>
                    <Text>
                      {doc.data().sports ? doc.data().sports.join(', ') : ''}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
        })}
      </MapView>
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
