import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-elements';

const ViewLocation = () => {
  const [markers] = useState([
    {
      id: 1,
      coordinate: { latitude: 24.906182799627903, longitude: 67.04723168073055 },
      title: 'Location 1',
      description: 'This is Location 1',
    },
    {
      id: 2,
      coordinate: { latitude: 24.905987727371468, longitude: 67.04761652851076 },
      title: 'Location 2',
      description: 'This is Location 2',
    },
  ]);

  const initialRegion = {
    latitude: 24.906182799627903,
    longitude: 67.04723168073055,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
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
  infoContainer: {
    flex: 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ViewLocation;
