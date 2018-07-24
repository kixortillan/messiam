import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default class CButton extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} 
      style={{ flex: 1, backgroundColor: '#009688', paddingVertical: 12, borderRadius: 25 }}>
        <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}