import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Card extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E0E0E0', margin: 10, ...this.props.style }}>
      {this.props.children}
      </View>
    );
  }
}