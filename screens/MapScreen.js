import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Button,
  ViewBase,
} from 'react-native';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import Modal from 'react-native-modal';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
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
  const [modalName, setModalName] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [modalBio, setModalBio] = useState(null);
  const [modalSports, setModalSports] = useState(null);

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

  const handleCalloutPress = (id, name, bio, sports) => {
    setModalName(name);
    setModalSports(sports);
    setShowModal(true);
    setModalBio(bio);

    const getTheImage = async () => {
      let imageRef = ref(storage, `profile/${id}/image`);
      const downloadURL = await getDownloadURL(imageRef);
      setModalImage(downloadURL);
    };

    getTheImage();
  };

  const getImage = (name) => {
    switch (name) {
      case 'Walking':
        return require('../assets/sports/Walking.png');
      case 'Running':
        return require('../assets/sports/Running.png');
      case 'Swimming':
        return require('../assets/sports/Swimming.png');
      case 'Boxing':
        return require('../assets/sports/Boxing.png');
      case 'Tennis':
        return require('../assets/sports/Tennis.png');
      case 'Table tennis':
        return require('../assets/sports/Tabletennis.png');
      case 'Cycling':
        return require('../assets/sports/Cycling.png');
      case 'Gym':
        return require('../assets/sports/Gym.png');
    }
  };

  return (
    <View style={{}}>
      {region.latitude && (
        <MapView style={{ height: '100%' }} region={region}>
          {users
            .filter((doc) => doc.id !== auth?.currentUser?.uid) // filter out the current user
            .map((doc, index) => {
              if (doc.data().location)
                return (
                  <Marker
                    key={index}
                    coordinate={doc.data().location}
                    title={doc.data().name}
                    onCalloutPress={() =>
                      handleCalloutPress(
                        doc.id,
                        doc.data().name,
                        doc.data().bio,
                        doc.data().sports
                      )
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
                                    resizeMode="cover"
                                    style={{
                                      width: 70,
                                      height: 70,
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
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
              onPress={() => {
                setModalImage(null);
                setShowModal(false);
              }}
            >
              <AntDesign name="closecircleo" size={40} color="white" />
            </TouchableOpacity>
            {modalImage ? (
              <Image
                source={{ uri: modalImage }}
                resizeMode="contain"
                style={{
                  flex: 2,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
            ) : null}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, padding: 10 }}>{modalName}</Text>
            <Text style={{ padding: 10, fontSize: 18 }}>{modalBio}</Text>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {modalSports?.map((sport, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={getImage(sport)}
                        resizeMode="contain"
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white',
                        }}
                      />

                      <View>
                        <Text style={{ padding: 5 }}>{sport}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              <TouchableOpacity
                style={{
                  width: 250,
                  backgroundColor: '#ef3939',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginVertical: 20,
                }}
                onPress={() => console.log('Go to message screen')}
              >
                <Text
                  style={{
                    padding: 10,
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '500',
                  }}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>
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
    flex: 0.7,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default MapScreen;
