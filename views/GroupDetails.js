import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { createTabNavigator } from 'react-navigation';

class MemberList extends React.PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase.firestore()
      .doc(``);
  }
  
  render() {
    return (
      <FlatList data={null} renderItem={({item}) => {
        return (
          <View>
            <Image  />
            <Text></Text>
          </View>
        );
      }} />
    );
  }
}

const TabNav = createTabNavigator({
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