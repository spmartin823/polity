import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

console.disableYellowBox = true;

export default class LinkTouchableOpacity extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    if(this.props.clickFunction() !== 'undefined') {
      this.props.clickFunction(e).then(data => data)
    }
  }

  render() {
   return (
      <TouchableOpacity
        style={{
          flex: 1, 
          padding: 5, 
          justifyContent: 'center', 
          alignItems: 'center', 
        }}
        loading={this.props.loading}
        onPress={this.handlePress}  
      >
        <Text style={{ color: this.props.textColor || 'white', fontSize: 15, textAlign: 'center' }}> 
          {this.props.title} 
        </Text> 
      </TouchableOpacity> 
    )
  }
}