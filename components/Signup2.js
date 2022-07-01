import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const Signup2 = ({
  location,
  region,
  getCurrentPosition,
  setUserLocation,
  nextStep,
  previousStep,
}) => {
  const INITALREGION = {
    latitude: 44.814026,
    longitude: -99.632196,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  useEffect(() => {
    if (!location) getCurrentPosition();
  }, [location]);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 20, top: 20 }}
        onPress={previousStep}
      >
        <AntDesign name="arrowleft" size={34} color="black" />
      </TouchableOpacity>

      <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1.2 }}
      >
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 28 }}>Tap your location on the map</Text>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <MapView
          initialRegion={INITALREGION}
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
                width: 250,
                backgroundColor: location ? '#ef3939' : 'grey',
                alignItems: 'center',
                borderRadius: 15,
                marginHorizontal: 10,
              }}
              onPress={() => {
                if (location) nextStep();
              }}
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
