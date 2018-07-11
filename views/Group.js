import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { SwitchNavigator, SafeAreaView } from 'react-navigation';
import firebase from '../lib/firebase';

class Group extends React.Component {
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

        this.props.
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue"
     barStyle="dark-content" />
        <Text>Group View</Text>
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
    groups: state.groups,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveGroup: groups => (dispatch({type: 'SAVE_GROUPS', data: {groups: groups}})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);