import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class GroupDetails extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image />
        <Text></Text>
      </View>
    );
  }
}

export default connect(null, null)(GroupDetails);