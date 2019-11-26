import React, {Component} from 'react';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import locations from '../locations.json';

export default class MapDirection extends Component {
  state = {
    latitude: null,
    longitude: null,
    locations: locations,
  };

  async componentWillMount () {
    const {status} = await Permissions.askAsync (Permissions.LOCATION);

    if (status != 'granted') {
      const response = await Permissions.askAsync (Permissions.LOCATION);
    }

    let location = await Location.getCurrentPositionAsync ({});

    let current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    this.setState (current);
    const {locations: [sampleLocation]} = this.state;
    this.setState (
      {
        desLatitude: sampleLocation.coords.latitude,
        desLongitude: sampleLocation.coords.longitude,
      },
      () => console.log ('locations state' + this.state)
    );
  }

  render () {
    const {latitude, longitude, locations} = this.state;
    if (latitude) {
      return (
        <MapView
          showsUserLocation
          style={{flex: 1}}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapViewDirections
            origin={{latitude, longitude}}
            destination={locations[0].coords}
            apikey={''}
            strokeWidth={3}
            strokeColor="blue"
          />
        </MapView>
      );
    }
  }
}
