import React, { useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Signup4 = ({ sports, setSports, handleSignup, previousStep }) => {
  useEffect(() => {
    console.log(sports);
  }, [sports]);

  const handlePress = (sport) => {
    if (sports.length < 3 && !sports.includes(sport)) {
      setSports((oldSports) => [...oldSports, sport]);
    } else {
      setSports((oldSports) =>
        oldSports.filter((eachSport) => eachSport !== sport)
      );
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 20, top: 20 }}
        onPress={previousStep}
      >
        <AntDesign name="arrowleft" size={34} color="black" />
      </TouchableOpacity>
      <View style={{ marginBottom: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 10 }}>
          <Text style={{ fontSize: 28 }}>Select your sports</Text>
          <Text style={{ fontSize: 18 }}>Max 3 sports</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Walking')}
          >
            <Text style={{ fontSize: 18 }}>Walking</Text>
          </Pressable>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Running')}
          >
            <Text style={{ fontSize: 18 }}>Running</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Tennis')}
          >
            <Text style={{ fontSize: 18 }}>Tennis</Text>
          </Pressable>
          <Pressable
            style={{
              height: 140,
              width: 140,
              backgroundColor: sports.includes('Ping pong')
                ? 'lightgreen'
                : 'lightgrey',
              borderColor: 'black',
              borderWidth: 2,
              margin: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handlePress('Ping pong')}
          >
            <Text style={{ fontSize: 18 }}>Ping pong</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Gym')}
          >
            <Text style={{ fontSize: 18 }}>Gym</Text>
          </Pressable>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Boxing')}
          >
            <Text style={{ fontSize: 18 }}>Boxing</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Swimming')}
          >
            <Text style={{ fontSize: 18 }}>Swimming</Text>
          </Pressable>
          <Pressable
            style={{
              height: 140,
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
            onPress={() => handlePress('Cycling')}
          >
            <Text style={{ fontSize: 18 }}>Cycling</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <TouchableOpacity
              style={{
                width: 250,
                backgroundColor: sports.length ? '#ef3939' : 'grey',
                alignItems: 'center',
                borderRadius: 15,
                marginHorizontal: 10,
              }}
              onPress={() => (sports.length ? handleSignup() : null)}
            >
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontSize: 22,
                  fontWeight: '500',
                }}
              >
                Finish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  box1: {
    width: 100,
    height: 100,
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  inner: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  shadow1: {
    shadowColor: 'blue',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
  },
});

export default Signup4;
