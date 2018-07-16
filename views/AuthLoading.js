import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
// import { SecureStore } from 'expo'; 
import firebase from '../lib/firebase';

class AuthLoading extends PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('User: ', user);
    
      if(user !== null) {
        this.props.saveUser(user);
      }
      
      this.props.navigation.navigate(user ? 'AppStack' : 'AuthStack');
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <ActivityIndicator size='large' />
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
    // saveToken: credentials => dispatch({ type: 'SAVE_TOKEN', data: { accessToken: credentials }}),
    saveUser: user => dispatch({ type: 'USER_AUTH', data: { user: user } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);