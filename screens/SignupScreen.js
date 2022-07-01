import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Image,
} from 'react-native';

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

import Signup1 from '../components/Signup1';
import Signup2 from '../components/Signup2';
import Signup3 from '../components/Signup3';
import Signup4 from '../components/Signup4';

const SignupScreen = ({ navigation }) => {
  const [modalStep, setModalStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [sports, setSports] = useState([]);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

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

  const setUserLocation = (coords) => {
    setLocation(coords);
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  const getCurrentPosition = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let currentPosition = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      setRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const previousStep = () => {
    setModalStep((prevStep) => prevStep - 1);
  };

  const nextStep = () => {
    setModalStep((previousStep) => previousStep + 1);
  };

  const checkAndProceed = () => {
    if (email && password) {
      if (password.length < 5) {
        Alert.alert(
          'Password Length',
          'Your password has to be at least 5 characters long'
        );
        return;
      }
      if (password !== reenterPassword) {
        Alert.alert('Password Mismatch', 'Re-enter the same password');
        return;
      }
      setModalStep((previousStep) => previousStep + 1);
    } else {
      Alert.alert(
        'Account Credentials',
        'You need to type Email and Password in order to create an account'
      );
      return;
    }
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            city: city,
            location: location,
            sports: sports,
          });

          if (image) storeImage();
        }
        // ...
      })
      .then(() => {
        navigation.replace('TabView');
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
        // ..
      });
  };

  return (
    <Modal>
      {modalStep === 1 && (
        <Signup1
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          city={city}
          setCity={setCity}
          password={password}
          setPassword={setPassword}
          reenterPassword={reenterPassword}
          setReenterPassword={setReenterPassword}
          checkAndProceed={checkAndProceed}
          nextStep={nextStep}
          navigation={navigation}
        />
      )}
      {modalStep === 2 && (
        <Signup2
          location={location}
          region={region}
          getCurrentPosition={getCurrentPosition}
          setUserLocation={setUserLocation}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}
      {modalStep === 3 && (
        <Signup3
          image={image}
          pickImage={pickImage}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}
      {modalStep === 4 && (
        <Signup4
          sports={sports}
          setSports={setSports}
          handleSignup={handleSignup}
          previousStep={previousStep}
        />
      )}
    </Modal>
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

export default SignupScreen;
