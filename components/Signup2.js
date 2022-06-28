import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

const Signup2 = ({
  location,
  region,
  getCurrentPosition,
  setUserLocation,
  nextStep,
  previousStep,
}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1.2 }}
      >
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 28 }}>Tap your location on the map</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 250,
            backgroundColor: 'blue',
            alignItems: 'center',
            borderRadius: 15,
            marginBottom: 20,
          }}
          onPress={getCurrentPosition}
        >
          <Text
            style={{
              padding: 10,
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            Enable Location Services
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 5 }}>
        <MapView
          region={region}
          style={styles.map}
          onPress={(e) => setUserLocation(e.nativeEvent.coordinate)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          maxZoomLevel={15}
        >
          {location && <MapView.Marker coordinate={location} />}
        </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
  },
});

export default Signup2;
