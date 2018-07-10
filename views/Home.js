import React from 'react';
import { StyleSheet, Text, View, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { MapView, Location, Permissions, FileSystem } from 'expo';
import { SwitchNavigator } from 'react-navigation';
import firebase from '../lib/firebase';

class Home extends React.Component {

  constructor() {
    super();
    this.myLocation = this.myLocation.bind(this);
  }
  
  myLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status == 'granted') {
      // let location = await Location.getCurrentPositionAsync({});
      // console.log('Location:', location);      
      // this.setState({
      //   lat: location.coords.latitude, 
      //   lng: location.coords.longitude, 
      //   region: {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 1, longitudeDelta: 1}
      // });
      // this.props.updateMyLoc(location.coords.latitude, location.coords.longitude);
      const watchLoc = Location.watchPositionAsync({
        enableHighAccuracy: false,
        timeInterval: 120000,//2mins
        distanceInterval: 60,
      }, ({ coords, mocked, timestamp }) => {
        //update current users lat and long
        console.log('Watch Loc Update:  ', coords);
        this.props.updateMyLoc(coords.latitude, coords.longitude);
      });
    }
  }

  handleOnRegionChange = () => {

  }

  componentDidMount() {
    this.myLocation();

    FileSystem.downloadAsync('https://lh3.googleusercontent.com/-_y4wV8FSjHQ/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7rFf0evsF5coa1SuK5v9AneDdgNew/s96-c-mo/photo.jpg', FileSystem.documentDirectory + `/img/${this.props.user.profilePicture}.png`)
      .then(({ uri }) => {
        console.log(uri);
        this.props.updateLocalProfilePic(uri);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <MapView style={{ flex: 1 }} initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.lng,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }} region={this.state.region} showUsersLocation={true} followsUserLocation={true} loadingEnabled={true} showsMyLocationButton={true} /> */}
        <MapView style={{ flex: 1 }} region={{ latitude: this.props.user.lat || 0, longitude: this.props.user.lng || 0, latitudeDelta: 0.009, longitudeDelta: 0.009 }}
        showUsersLocation={true} followsUserLocation={true} 
        loadingEnabled={true} showsMyLocationButton={true}>
          <MapView.Marker key={-1} coordinate={{ latitude: this.props.user.lat || 0, longitude: this.props.user.lng || 0 }} 
          image={'https://lh4.googleusercontent.com/-_y4wV8FSjHQ/AAAAAAAAAAI/AAAAAAAAAAU/RFWDnhE2-FM/s96-c/photo.jpg'}
          style={{ borderColor: 'red' }}
          title='Your location' description='Your location'>
          </MapView.Marker>
        </MapView>
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

const mapStateToProps = state => {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateMyLoc: (lat, lng) => {
      dispatch({ type: 'UPDATE_MY_LOC', data: {lat: lat, lng: lng} });
    },
    updateLocalProfilePic: (uri) => {
      dispatch({ type:'UPDATE_LOCAL_PROF_PIC', data: {localProfilePic: uri} });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);