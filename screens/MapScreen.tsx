import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert, Image } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Share from 'react-native-share';
import MapViewDirections from 'react-native-maps-directions';
import GOOGLE_MAPS_APIKEY from '../constant';

const customMarkerImage = require('../assets/img.png');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 50, 
    height: 50, 
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});



export default function MapScreen() {
  const [myLocation, setMyLocation] = useState({
    latitude: 24.90641657132238,
    longitude: 67.04628543227014,
  });

  const destination = {
    latitude: 24.93526100543665,
    longitude:  67.0509231488264 ,
  };

  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        console.log(info);
        setMyLocation({ ...info.coords });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const shareLocation = async () => {
    const message = `Check out my location: https://www.google.com/maps?q=${myLocation.latitude},${myLocation.longitude}`;
    try {
      await Share.open({ message });
      console.log('Location shared successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to share location.');
      console.error(error);
    }
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: myLocation.latitude || 24.914536859243057,
          longitude: myLocation.longitude || 67.05808522441025,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <MapViewDirections
          origin={myLocation} 
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY} 
          strokeWidth={30}
          strokeColor="hotpink"
        />

        {myLocation.latitude && myLocation.longitude && (
          <>
            <Circle
              center={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              radius={30}
              fillColor="rgba(255, 0, 0, 0.3)" 
              strokeColor="rgba(255, 0, 0, 0.6)" 
            />
            <Marker
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              title="My Location"
              description="This is where you are"
            >
              <Image source={customMarkerImage} style={styles.markerImage} />
            </Marker>
            <Marker
              coordinate={destination}
              title="Destination"
              description="This is your destination"
              pinColor="blue" 
            />
          </>
        )}
      </MapView>
      <Button title="Share Location" onPress={shareLocation} />
    </View>
  );
}
