import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SecureStore } from 'expo'; 
import firebase from '../lib/firebase';

class AuthLoading extends Component {
  constructor() {
    super();
  }

  getCredentials() {
    SecureStore.getItemAsync('accessToken').then((accessToken) => {
      console.log('Token: ', accessToken);
      this.props.saveToken(accessToken);
      this.props.navigation.navigate(accessToken ? 'AppStack' : 'AuthStack');
    }).catch((err) => {
      console.error(err);   
    });
  }

  componentDidMount() {
    //console.log(this.props);
    //this.getCredentials();
    firebase.auth().onAuthStateChanged((user) => {
      console.log('User: ', user);
    
      if(user !== null) {
        this.props.saveUser(user);
        this.props.navigation.navigate(user ? 'AppStack' : 'AuthStack');
      }
    
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size='small' />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveToken: credentials => dispatch({ type: 'SAVE_TOKEN', data: { accessToken: credentials }}),
    saveUser: user => dispatch({ type: 'USER_AUTH', data: { user: user } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);