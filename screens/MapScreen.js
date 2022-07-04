import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';
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
  const INITALREGION = {
    latitude: 44.814026,
    longitude: -99.632196,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [region, setRegion] = useState(INITALREGION);

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

  useEffect(() => {
    setRegion({
      latitude: currentUserData?.location?.latitude,
      longitude: currentUserData?.location?.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }, [currentUserData]);

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
      <MapView style={{ height: '100%' }} region={region}>
        {users.map((doc, index) => {
          const getImage = (name) => {
            switch (name) {
              case 'Walking':
                require('../assets/sports/Walking.png');
              case 'Running':
                require('../assets/sports/Running.png');
              case 'Swimming':
                require('../assets/sports/Swimming.png');
              case 'Boxing':
                require('../assets/sports/Boxing.png');
              case 'Tennis':
                require('../assets/sports/Tennis.png');
              case 'Table tennis':
                require('../assets/sports/Tabletennis.png');
              case 'Cycling':
                require('../assets/sports/Cycling.png');
              case 'Gym':
                require('../assets/sports/Gym.png');
            }
          };

          if (doc.data().location)
            return (
              <Marker
                key={index}
                coordinate={doc.data().location}
                title={doc.data().name}
                // description={
                //   doc.data().sports ? doc.data().sports.join(', ') : ''
                // }
              >
                <Callout
                  // tooltip
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      {doc.data().name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      {doc.data().sports.map((sport, index) => {
                        return (
                          <View
                            key={index}
                            style={{ flex: 1, backgroundColor: 'transparent' }}
                          >
                            {Platform.OS === 'ios' ? (
                              <Image
                                source={getImage(sport)}
                                resizeMode="contain"
                                style={{
                                  width: 60,
                                  height: 60,
                                  backgroundColor: 'white',
                                }}
                              />
                            ) : (
                              <View>
                                <Text style={{ padding: 5 }}>{sport}</Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>
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
