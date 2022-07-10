import React, { useLayoutEffect, useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import UsersContext from '../context/usersContext';

const ProfileScreen = ({ navigation }) => {
  const { usersState } = useContext(UsersContext);

  const [name, setName] = useState(usersState.currentUser.name);
  const [bio, setBio] = useState(usersState.currentUser.bio);
  const [location, setLocation] = useState(usersState.currentUser.location);
  const [sports, setSports] = useState([...usersState.currentUser.sports]);
  const [image, setImage] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [name, bio, location, sports, image]);

  useEffect(() => {
    console.log('count', count);
  }, [count]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const getTheImage = async () => {
      let imageRef = ref(storage, `profile/${auth.currentUser.uid}/image`);
      const downloadURL = await getDownloadURL(imageRef);
      setImage(downloadURL);
    };

    getTheImage();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const storeImage = async () => {
    const imageRef = ref(storage, `profile/${auth.currentUser.uid}/image`);

    if (image) {
      let img = await fetch(image);
      let blob = await img.blob();

      await uploadBytes(imageRef, blob)
        .then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:
              downloadURL ||
              'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png',
          });
        })
        .catch((e) => {
          console.log('profile photo error', e);
          alert(e);
        });
    }
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: name,
        bio: bio,
        location: location,
        sports: sports,
      });

      if (image) storeImage();

      console.log('Profile Saved');
      navigation.replace('TabView');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handlePress = (sport) => {
    if (sports.length < 3 && !sports.includes(sport)) {
      setSports((oldSports) => [...oldSports, sport]);
    } else {
      setSports((oldSports) =>
        oldSports.filter((eachSport) => eachSport !== sport)
      );
    }
  };

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
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{ position: 'absolute', right: 0, top: 50 }}
          onPress={signUserOut}
        >
          <SimpleLineIcons
            name="logout"
            size={30}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <Text>Log out</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 60, alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>My account</Text>
        </View>

        <View
          style={{
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 40,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: 'grey',
                  borderRadius: 20,
                }}
              />
            ) : (
              <Image
                source={require('../assets/addphoto.png')}
                resizeMode="contain"
                style={{ width: 200, height: 200, backgroundColor: 'white' }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              alignItems: 'flex-start',
              paddingLeft: 3,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TextInput
              style={{
                backgroundColor: 'lightgrey',
                width: 300,
                fontSize: 18,
                height: 40,
                borderRadius: 7,
                padding: 10,
              }}
              value={name}
              onChangeText={setName}
              underlineColor={'transparent'}
              activeUnderlineColor={'white'}
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              alignItems: 'flex-start',
              paddingLeft: 3,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bio</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TextInput
              style={{
                backgroundColor: 'lightgrey',
                width: 300,
                fontSize: 18,
                height: 120,
                borderRadius: 7,
                padding: 10,
                textAlignVertical: 'top',
              }}
              value={bio}
              onChangeText={setBio}
              underlineColor={'transparent'}
              activeUnderlineColor={'white'}
              multiline
            />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <TouchableOpacity
            style={{
              width: 250,
              backgroundColor: '#ef3939',
              alignItems: 'center',
              borderRadius: 15,
              marginHorizontal: 10,
            }}
            onPress={() =>
              navigation.navigate('TheProfileMap', {
                location: location,
                setLocation: setLocation,
              })
            }
          >
            <Text
              style={{
                padding: 10,
                color: 'white',
                fontSize: 22,
                fontWeight: '500',
              }}
            >
              Edit Location
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              alignItems: 'flex-start',
              paddingLeft: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Interests</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 3,
            }}
          >
            {sports.map((sport, index) => {
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
                <View key={index}>
                  <Image
                    source={getImage(sport)}
                    resizeMode="contain"
                    style={{ width: 50, height: 50, backgroundColor: 'white' }}
                  />
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Walking')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Walking')}
              onPress={() => handlePress('Walking')}
            >
              <Text style={{ fontSize: 18 }}>Walking</Text>
            </Pressable>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Running')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Running')}
              onPress={() => handlePress('Running')}
            >
              <Text style={{ fontSize: 18 }}>Running</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Tennis')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Tennis')}
              onPress={() => handlePress('Tennis')}
            >
              <Text style={{ fontSize: 18 }}>Tennis</Text>
            </Pressable>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Table tennis')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('tennis')}
              onPress={() => handlePress('Table tennis')}
            >
              <Text style={{ fontSize: 18 }}>Table tennis</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Gym')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Gym')}
              onPress={() => handlePress('Gym')}
            >
              <Text style={{ fontSize: 18 }}>Gym</Text>
            </Pressable>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Boxing')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Boxing')}
              onPress={() => handlePress('Boxing')}
            >
              <Text style={{ fontSize: 18 }}>Boxing</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Swimming')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Swimming')}
              onPress={() => handlePress('Swimming')}
            >
              <Text style={{ fontSize: 18 }}>Swimming</Text>
            </Pressable>
            <Pressable
              style={{
                height: 110,
                width: 140,
                backgroundColor: sports.includes('Cycling')
                  ? 'lightgreen'
                  : 'lightgrey',
                borderColor: 'black',
                borderWidth: 2,
                margin: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={sports.length === 3 && !sports.includes('Cycling')}
              onPress={() => handlePress('Cycling')}
            >
              <Text style={{ fontSize: 18 }}>Cycling</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <TouchableOpacity
            style={{
              width: 250,
              backgroundColor: count > 2 ? '#ef3939' : 'grey',
              alignItems: 'center',
              borderRadius: 15,
              marginHorizontal: 10,
            }}
            disabled={count <= 2}
            onPress={handleSave}
          >
            <Text
              style={{
                padding: 10,
                color: 'white',
                fontSize: 22,
                fontWeight: '500',
              }}
            >
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});

export default ProfileScreen;
