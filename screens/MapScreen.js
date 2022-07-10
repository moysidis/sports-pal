import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  Button,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import UsersContext from '../context/usersContext';

const MapScreen = ({ navigation, route }) => {
  const { usersState } = useContext(UsersContext);

  const INITALREGION = {
    latitude: 44.814026,
    longitude: -99.632196,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  const [users, setUsers] = useState(usersState.userDocs);
  const [currentUserData, setCurrentUserData] = useState(
    usersState.currentUser
  );
  const [region, setRegion] = useState(INITALREGION);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header
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
      {region.latitude && (
        <MapView style={{ height: '100%' }} region={region}>
          {users
            .filter((doc) => doc.id !== auth?.currentUser?.uid) // filter out the current user
            .map((doc, index) => {
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
                    onCalloutPress={() => setShowModal(true)}
                    // description={
                    //   doc.data().sports ? doc.data().sports.join(', ') : ''
                    // }
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
                        <View style={{ flexDirection: 'row' }}>
                          {doc.data().sports.map((sport, index) => {
                            return (
                              <View
                                key={index}
                                style={{
                                  flex: 1,
                                  backgroundColor: 'transparent',
                                }}
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
      )}
      <Modal visible={showModal}>
        <View style={styles.modalOuterView}>
          <View style={styles.modalInnerView}>
            <Text> User Profile </Text>
            <Button title="Close" onPress={() => setShowModal(false)}></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
  modalOuterView: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, .8)',
  },
  modalInnerView: {
    alignItems: 'center',
    width: 150,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default MapScreen;
