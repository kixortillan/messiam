import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default class CButton extends React.PureComponent {
  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
        <TouchableOpacity onPress={this.props.onPress} 
        style={{ backgroundColor: '#009688', width: 120, paddingTop: 10, paddingBottom: 10, borderRadius: 25 }}>
          <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}