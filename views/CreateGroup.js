import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CButton from '../components/CButton';
import Card from '../components/Card';

class CreateGroup extends React.PureComponent {
  static navigationOptions = {
    title: 'Create New Group',
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
      groupAlias: ''
    };
  }

  render() {
    return (
      <Card style={{ flexGrow: 0, height: 10 }}>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <TextInput onChange={(text) => {this.setState({groupAlias: text})}} style={{ height: 40 }} />
          <CButton onPress={() => console.log('clicked')} title='Save' />
        </View>
      </Card>
    );
  }
}

export default connect(null, null)(CreateGroup);