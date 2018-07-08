import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'; 

class Login extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={() => {}} title='Login' accessibilityLabel='press this button to login' />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({ type: 'LOGIN_USER', data: {} });
  }
};