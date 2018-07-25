import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Notification extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>Notifs Here</Text>
      </View>
    );
  }
}

export default connect(null, null)(Notification);