import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Signup3 = ({ image, pickImage, nextStep, previousStep }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text style={{ fontSize: 34 }}>Add Profile Photo</Text>
        <Text style={{ fontSize: 18 }}>Add a profile photo so</Text>
        <Text style={{ fontSize: 18 }}>your friends know it's you</Text>
      </View>

      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
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
      <View style={{ flex: 0.7 }}>
        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <TouchableOpacity
              style={{
                width: 150,
                backgroundColor: 'grey',
                alignItems: 'center',
                borderRadius: 15,
                marginHorizontal: 10,
              }}
              onPress={previousStep}
            >
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontSize: 22,
                  fontWeight: '500',
                }}
              >
                Previous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 150,
                backgroundColor: '#ef3939',
                alignItems: 'center',
                borderRadius: 15,
                marginHorizontal: 10,
              }}
              onPress={nextStep}
            >
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontSize: 22,
                  fontWeight: '500',
                }}
              >
                Next
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
});

export default Signup3;
