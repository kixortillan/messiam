import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../lib/firebase';

class Profile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row', flexGrow: 1 }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Image source={{ uri: this.props.user.photoURL }} 
            style={{ width: 60, height: 60, borderRadius: 50, borderWidth: StyleSheet.hairlineWidth, borderColor: '#9E9E9E' }} />
          </View>
          <View style={{ flexGrow: 3, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.props.user.displayName}</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexGrow: 5 }}>
          <Text>Flat List Here</Text>
        </View>
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

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);