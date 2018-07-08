import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SecureStore } from 'expo'; 

class AuthLoading extends Component {
  constructor() {
    super();
  }

  getCredentials() {
    SecureStore.getItemAsync('credentials').then((credentials) => {
      console.log('Credentials: ', credentials);
      this.props.saveToken(credentials);
      this.props.navigation.navigate(credentials ? 'AppStack' : 'AuthStack');
    }).catch((err) => {
      console.error(err);   
    });
  }

  componentDidMount() {
    //console.log(this.props);
    this.getCredentials();
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);