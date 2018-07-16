import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { SwitchNavigator, SafeAreaView } from 'react-navigation';
import firebase from '../lib/firebase';

class Account extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.user.displayName}</Text>
        <Text>{this.props.user.email}</Text>
        <Text>Account View</Text>
        <Text>Account View</Text>
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

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);