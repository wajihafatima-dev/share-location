import React, { useEffect, useState } from 'react';
import { Alert, Share, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import { Button } from 'react-native-elements';

const MapScreen:React.FC<any>=({navigation}) => {
  const [region, setRegion] = useState({
    latitude: 24.906182799627903,
    longitude: 67.04723168073055,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    title: '',
    description: '',
  });

  const [markers, setMarkers] = useState([
    {
      coordinate: { latitude: 24.906182799627903, longitude: 67.04723168073055 },
      title: 'Marker 1',
      description: 'This is Marker 1',
    },
    {
      coordinate: { latitude: 24.905987727371468, longitude: 67.04761652851076 },
      title: 'Marker 2',
      description: 'This is Marker 2',
    },
  ]);

  const sendLocationToFirebase = (latitude: number, longitude: number) => {
    const userLocationRef = database().ref('/location'); 
    userLocationRef
      .set({
        latitude,
        longitude,
        timestamp: Date.now(),
        title: 'My Current Location',
        description: 'This is your current location.',
      })
      .then(() => {
        Alert.alert('Location sent to Firebase successfully!')
        navigation.navigate('ViewLocation')
  })
      .catch((error) => console.log('Error sending location:', error));
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          title: 'My Current Location',
          description: 'My location is here',
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 100 }
    );
  }, []);

  const onRegionChange = (newRegion: any) => {
    setRegion(newRegion);
  };
  const shareLocation = async () => {
    try {
      const message = `Check out my current location: https://www.google.com/maps?q=${region.latitude},${region.longitude}`;
      await Share.share({
        message,
      });
    } catch (error) {
      console.error("Error sharing location:", error);
    }
  };
  const handleMarkerPress = () => {
    
    setRegion({
      ...region,
      title: 'My Current Location',
      description: 'This is your current location.',
    });
  };


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={handleMarkerPress} 
          />
        ))}
      </MapView>
      <View style={{ flex: 0.2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <View style={{ flex: 1, width: '100%', marginBottom: 5 }}>
    <Button title="Save Location" onPress={() => sendLocationToFirebase(region.latitude, region.longitude)} />
  </View>
  <View style={{ flex: 1, width: '100%' }}>
    <Button title="Share Location" onPress={shareLocation} />
  </View>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
