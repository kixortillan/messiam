import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { MapView, Location, Permissions } from 'expo';
import firebase from '../lib/firebase';
import MapMarkerImage from '../components/MapMarkerImage';

class Home extends React.PureComponent {
  constructor() {
    super();
    this.myLocation = this.myLocation.bind(this);
  }
  
  myLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status == 'granted') {
      const watchLoc = Location.watchPositionAsync({
        enableHighAccuracy: true,
        timeInterval: 60000,//2mins
        distanceInterval: 10,
      }, ({ coords, mocked, timestamp }) => {
        //update current users lat and long
        console.log('Watch Loc Update: ', coords);
        this.props.updateMyLoc(this.props.user, coords.latitude, coords.longitude);
      });
    }
  }

  componentDidMount() {
    this.myLocation();
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <MapView style={{ flex: 1 }} 
          region={{ latitude: this.props.user.lat || 0, longitude: this.props.user.lng || 0, latitudeDelta: 0.009, longitudeDelta: 0.009 }}
          showUsersLocation={true} followsUserLocation={true} 
          loadingEnabled={true} showsMyLocationButton={true}>
          <MapView.Marker key={-1} 
          coordinate={{ latitude: this.props.user.lat || 0, longitude: this.props.user.lng || 0 }} 
          style={{ borderColor: 'red' }}
          title={this.props.user.displayName}>
              <MapMarkerImage url={this.props.user.photoURL}/>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateMyLoc: (user, lat, lng) => {
      dispatch({ type: 'UPDATE_MY_LOC', data: {lat: lat, lng: lng} });

      return firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          lat: lat,
          lng: lng,
          locationUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);