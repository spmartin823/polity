import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameBoard from './GameBoard'

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View className="GameScreen">
        <GameBoard />

      </View>
    );
  }
}