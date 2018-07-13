import React, { Component } from 'react';
import { Image, View } from 'react-native';
// import { FileSystem } from 'expo';

export default class MapMarkerImage extends Component {
  
  constructor() {
    super();
    this.state = {
      isImageLoaded: false,
      defaultImg: require('../assets/img/user-img.png'),
    };
  }
  
  render() {
    if(!this.state.isImageLoaded) {
      return (
        <View>
          <Image onLoadEnd={() => this.setState({isImageLoaded: true})}
          style={{ flex: 1, height: 0, width: 0, borderRadius: 50, borderWidth: 3, borderColor: '#FFF' }} 
          source={{ uri: this.props.url }} />
          <Image style={{ flex: 1, height: 40, width: 40, borderRadius: 50, borderWidth: 3, borderColor: '#FFF' }} 
          source={this.state.defaultImg} />
        </View>
      );
    }

    return (
      <Image
      style={{ flex: 1, height: 40, width: 40, borderRadius: 50, borderWidth: 3, borderColor: '#FFF' }} 
      source={{ uri: this.props.url }} />
    );
  }
}