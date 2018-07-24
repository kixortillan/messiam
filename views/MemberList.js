import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, Image } from 'react-native';

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

export default connect(null, null)(MemberList);