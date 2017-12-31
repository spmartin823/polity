import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native';
import firebase from 'firebase'

import gameBackground from '../../assets/lights.png'

import Signup from './Signup'
import Login from './Login'
import LoadingPage from '../helperComponents/LoadingPage'

/* THIS IS THE ENTRY POINT FOR AUTHENTICATION

AuthScreen recieves 'this.props.passAuthedStatus' from app

AuthScreen
  \___Signup (if this.props.isSigningUp === true)
   \__Login (if this.props.isSigningUp === false)
        \___ResetPassword
         
*/

// console.disableYellowBox = true;

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: null
    }; 
    this.loadSignupPage = this.loadSignupPage.bind(this); 
    this.loadLoginPage = this.loadLoginPage.bind(this);
  }

  componentDidMount() {
    this.setState( {isSigningUp : false} )
  }

  loadSignupPage() { this.setState({isSigningUp: true}) }
  loadLoginPage() { this.setState({isSigningUp: false}) }

  render() {
    // console.log('this is the background image: ', gameBackground)
    return (
      <View style = {styles.background}> 
        {this.state.isSigningUp === null 
          ? <LoadingPage /> 
          : this.state.isSigningUp === true 
          ? (
            <View style={{ flex: 1 }}> 
              <Text>                  </Text> 
              <Signup 
                loadLoginPage = {this.loadLoginPage}
                passAuthedStatus = {this.props.passAuthedStatus}
              />
            </View> 
          ) : (
            <View style={{ flex: 1 }}> 
              <Login 
                loadSignupPage = {this.loadSignupPage}
                passAuthedStatus = {this.props.passAuthedStatus}
              />
            </View> 
          )
        }
    </View> 
    )
  }

}



const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
