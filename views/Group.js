import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import firebase from '../lib/firebase';

class Group extends React.PureComponent {
  static navigationOptions = {
    title: 'Groups',
  }

  constructor() {
    super();
    this.state = {
      isViewReady: false
    }
  }

  viewGroupDetails(id) {
    
  }

  componentDidMount() {
    firebase.firestore().collection('groups')
      .where(`users.${this.props.user.uid}`, '==', true)
      .onSnapshot((snapshot) => {
        const groups = [];
        snapshot.forEach((group) => {
          groups.push(Object.assign({}, group.data(), {id: group.id}));
        });
        
        this.props.saveGroup(groups);
        this.setState({ isViewReady: true });
      });
  }                                                                                                                                                                                                                           

  render() {
    if(!this.state.isViewReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {this.props.groups && 
          <FlatList data={this.props.groups && this.props.groups.map(group => Object.assign({}, {key: group.id, alias: group.alias}))} 
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={this.viewGroupDetails(item.key)}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                  <Text style={{ }}>{item.alias}</Text>
                  <Ionicons name='ios-arrow-forward-outline' size={24} color={'#9E9E9E'} />
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E0E0E0', marginLeft: 20, marginRight: 20 }}></View>
              </TouchableOpacity>
            );
          }} />}
      </View>
    );
  }
}

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