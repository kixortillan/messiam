import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { SwitchNavigator, SafeAreaView } from 'react-navigation';
import firebase from '../lib/firebase';

class Chat extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase.firestore().collection('groups')
      .where(`users.${this.props.user.uid}`, '==', true)
      .onSnapshot((snapshot) => {
        const groups = [];
        snapshot.forEach((group) => {
          groups.push(group.data());
        });
        console.log(groups);
        this.props.saveGroup(groups);
      });
  }                                                                                                                                                                                                                           

  render() {                                                                           
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="dark-content" />
        {this.props.groups && this.props.groups.map(group => <Text key={group.alias}>{group.alias}</Text>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);