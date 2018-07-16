import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { SwitchNavigator, SafeAreaView } from 'react-navigation';
import firebase from '../lib/firebase';

class ChatList extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
   
  }                                                                                                                                                                                                                           

  render() {                                                                           
    return (
      <View style={styles.container}>
        <Text>ChatList</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);