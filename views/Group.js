import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import firebase from '../lib/firebase';

class Group extends React.PureComponent {
  static navigationOptions = {
    title: 'Groups',
    headerStyle: {
      borderBottomColor: '#E0E0E0',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      fontSize: 16,
    }
  }

  constructor() {
    super();
    this.state = {
      isViewReady: false,
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
                  <Ionicons name='ios-arrow-forward-outline' size={16} color={'#9E9E9E'} />
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E0E0E0', marginLeft: 10, marginRight: 10 }}></View>
              </TouchableOpacity>
            );
          }} />}
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateGroup')} 
            style={{ backgroundColor: '#009688', width: 120, paddingTop: 10, paddingBottom: 10, borderRadius: 25 }}>
              <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Create Group</Text>
            </TouchableOpacity>
          </View>
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