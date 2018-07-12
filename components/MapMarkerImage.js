import React from 'react';

export default function MapMarkerImage ({ props }) {
  render() {
    <Image key={`profpic-${this.state.profPicLoaded}`} 
    onLayout={() => this.setState({profPicLoaded: true})} 
    style={{ flex: 1, height: 40, width: 40, borderRadius: 50, borderWidth: 3, borderColor: '#FFF' }} 
    source={{ uri: this.props.user.photoURL }} />
  }
}