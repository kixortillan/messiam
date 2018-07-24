import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from 'react-navigation';
import MemberList from './MemberList';

const TabNav = createMaterialTopTabNavigator({
  MemberList,
}, {
  initialRouteName: 'MemberList'
});

class GroupDetails extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image />
        <Text></Text>
        {/* <TabNav /> */}
      </View>
    );
  }
}

export default connect(null, null)(GroupDetails);