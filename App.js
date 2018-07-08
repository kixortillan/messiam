import React from 'react';
import { Provider, connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';3
import firebase from './lib/firebase';
import store from './store/store';

// export default class App extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       region: null,
//       lat: 0,
//       lng: 0,
//     }

//     this.handleOnRegionChange = this.handleOnRegionChange.bind(this);
//   }
  
//   myLocation = async() => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);

//     if(status == 'granted') {
//       let location = await Location.getCurrentPositionAsync({});
//       console.log('Location:', location);      
//       this.setState({
//         lat: location.coords.latitude, 
//         lng: location.coords.longitude, 
//         region: {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 1, longitudeDelta: 1}
//       });

//     }
//   }

//   handleOnRegionChange = () => {

//   }

//   componentDidMount() {
//     this.myLocation();
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <View style={styles.container}>
//         <MapView style={{ flex: 1 }} initialRegion={{
//           latitude: this.state.lat,
//           longitude: this.state.lng,
//           latitudeDelta: 1,
//           longitudeDelta: 1,
//         }} region={this.state.region} showUsersLocation={true} followsUserLocation={true} loadingEnabled={true} showsMyLocationButton={true} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });

//import Auth from './views/Auth';
import Login from './views/Login';
import Home from './views/Home';
import AuthLoading from './views/AuthLoading';

const AppStack = createStackNavigator({
  Home,
}, {
  initialRouteName: 'Home',
});

const AuthStack = createStackNavigator({
  Login
}, {
  initialRouteName: 'Login',
});

const RootStack = createSwitchNavigator({
  AppStack, AuthStack, AuthLoading
}, {
  initialRouteName: 'AuthLoading',
})

firebase.auth().onAuthStateChanged((user) => {
  console.log('User: ', user);

  if(user !== null) {
    firebase.auth().currentUser.getIdToken().then((idToken) => {
      console.log('Token:', idToken);
      // store.dispatch({ type: 'SAVE_AUTH', data: { credentials:  } });
    }).catch((err) => {
      console.error(err);
    });
  }

});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.cacheAssets = this.cacheAssets.bind(this);
    this.appIsReady = this.appIsReady.bind(this);
  }

  cacheAssets() {
    const images = [
      require('./abizo-splash.png'),
      require('./abizo.png'),
    ];
    const cache = images.map((img) => {

      return Asset.fromModule(img).downloadAsync();
    });

    return Promise.all(cache);
  }

  appIsReady() {
    store.dispatch({type: 'UPDATE_APP_READY', data: { isAppReady: true }});
  }

  componentDidMount() {
    
  }

  render() {
    if(this.state.isAppReady === false) {
      console.log('App Loading...');
      return (
        <AppLoading startAsync={this.cacheAssets} onFinish={this.appIsReady}
          onError={(err) => console.error(err)} />
      );
    }

    return (
      <Provider store={ store }>
        <RootStack style={{ flex: 1 }} />
      </Provider>
    );
  }
}