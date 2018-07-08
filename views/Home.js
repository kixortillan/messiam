import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { SwitchNavigator } from 'react-navigation';
import firebase from '../lib/firebase';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      region: null,
      lat: 0,
      lng: 0,
    }

    this.handleOnRegionChange = this.handleOnRegionChange.bind(this);
  }
  
  myLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status == 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      console.log('Location:', location);      
      this.setState({
        lat: location.coords.latitude, 
        lng: location.coords.longitude, 
        region: {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 1, longitudeDelta: 1}
      });

    }
  }

  handleOnRegionChange = () => {

  }

  componentDidMount() {
    this.myLocation();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={{ flex: 1 }} initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.lng,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }} region={this.state.region} showUsersLocation={true} followsUserLocation={true} loadingEnabled={true} showsMyLocationButton={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
