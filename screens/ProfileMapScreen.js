import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';

const ProfileMapScreen = ({ navigation, route }) => {
  const { location, setLocation } = route.params ?? {
    mapLocation: null,
  };

  const [mapLocation, setMapLocation] = useState(location);
  const [region, setRegion] = useState(null);

  const INITALREGION = {
    latitude: mapLocation.latitude,
    longitude: mapLocation.longitude,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarOptions: {},
    });
  });

  useEffect(() => {
    if (!mapLocation) getCurrentPosition();
  }, [mapLocation]);

  const setUserLocation = (coords) => {
    setMapLocation(coords);
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  const previousScreen = () => {
    setLocation(mapLocation);
    navigation.goBack();
  };

  const getCurrentPosition = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access mapLocation was denied');
        return;
      }

      let currentPosition = await Location.getCurrentPositionAsync({});
      setMapLocation({
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

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 20, top: 40 }}
        onPress={previousScreen}
      >
        <AntDesign name="arrowleft" size={34} color="black" />
      </TouchableOpacity>

      <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1.2 }}
      >
        <View
          style={{ alignItems: 'center', marginTop: 40, marginBottom: -20 }}
        >
          <Text style={{ fontSize: 24 }}>Tap your location on the map</Text>
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
          {mapLocation && <MapView.Marker coordinate={mapLocation} />}
        </MapView>
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
    height: Dimensions.get('window').height * 0.84,
  },
});

export default ProfileMapScreen;
