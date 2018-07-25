import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
// import { SecureStore } from 'expo'; 
import firebase from '../lib/firebase';

class AuthLoading extends PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log('User: ', user);
    
      if(user !== null) {
        try {
          await firebase.firestore().doc(`/users/${user.uid}`).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            // createdAt: user.createdAt,
          }, {
            merge: true,
          }); 

          this.props.saveUser(user);
        } catch(err) {
          console.error(err);
        }
      }

      this.props.navigation.navigate(user ? 'AppStack' : 'AuthStack');
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        {/* <ActivityIndicator size='large' /> */}
        <Image source={require('../applogo.png')} style={{ width: 40, height: 40 }} />
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