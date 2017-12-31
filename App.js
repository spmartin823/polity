import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import GameScreen from './components/board/GameScreen'
import AuthScreen from './components/authentication/AuthScreen'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winStatus: null,
      boardState: null,
      // move format: "<team><size><sizeIdx (a or b)><originIdx(0 = pieceCorral><destinationIdx>"
      // R3a25 would be a move of a red's "first" large piece from position 2 to position 5.
      lastMove: null, 
      authed: false,
    }
    this.passAuthStatus = this.passAuthStatus.bind(this)
  }

  componentDidMount() {

  }

  passAuthStatus(authed = true) { this.setState( {authed} ) }


  render() {
    return this.state.authed ? 
    (
      <View style={styles.main}>
        <Text>App is rendering the GameScreen</Text>
        <GameScreen
          winStatus={this.state.winStatus}
          boardState={this.state.boardState}
          lastMove={this.state.lastMove}
        />
      </View>
    ) : (
      <View style={styles.main}> 
        <Text>App is rendering the AuthScreen</Text>
        <AuthScreen 
          passAuthStatus = {this.passAuthStatus}
        /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});