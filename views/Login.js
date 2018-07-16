import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'; 
import { Google } from 'expo';
import firebase from '../lib/firebase';

class Login extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        {/* <Button onPress={this.props.login} title='Login' accessibilityLabel='press this button to login'>
          <Image source={require('../assets/img/btn_google_signin_light_normal_web.png')} />
        </Button> */}
        <TouchableOpacity onPress={this.props.login}>
          <Image source={require('../assets/img/btn_google_signin_light_normal_web.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => {
      //dispatch an action for updating flag for loading

      //call async
      Google.logInAsync({
        androidClientId: '191123677556-imqd9pdlm5llljoenv14pqd94n0anfeg.apps.googleusercontent.com',
        iosClientId: '191123677556-osecnctt2g6f5bc1nu19u74fo4nj8ltq.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      }).then((result) => {
          console.log('Google Auth: ', result);
          const credentials = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
          console.log('Credentials: ', credentials);
          firebase.auth().signInAndRetrieveDataWithCredential(credentials).catch((err) => {
            console.error('Error Authentication with Firebase via Google');
          });
        }).then(() => {
          //dispatch an action for flag loading
        });
      
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);