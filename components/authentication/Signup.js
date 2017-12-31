import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Keyboard, TextInput } from 'react-native';
import firebase from 'firebase'
import axios from 'axios'

import { serverUrl, localhost } from '../../config/serverConfig.js'

import LinkTouchableOpacity from '../helperComponents/LinkTouchableOpacity'
import LoadingPage from '../helperComponents/LoadingPage'

console.disableYellowBox = true;

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error : "", 
      email : "", 
      pw : "", 
    }; 
  }

  render() {
    return (this.state.loading && !this.state.error
    ? <LoadingPage loadingText={"signing up..."}/>  
    : <View style={styles.formContainer}> 

        {/* This is the email auth*/}
        <TextInput 
          style={styles.textInput}
          autoCapitalize={"none"}
          keyboardType={'email-address'}
          // autoFocus={true}
          autoCorrect={false}
          onChangeText={(text) => this.state.email = text} 
          returnKeyType={'done'}
          onSubmitEditing={Keyboard.dismiss}
          onScroll={Keyboard.dismiss}
          placeholder="Email Address"
          placeholderTextColor="#b2b1b0"
          inputStyle={{
            color: 'white', 
            textAlign: 'center'
          }}

        />

        <TextInput
          style={styles.textInput} 
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          placeholder="Password" 
          onChangeText={(pw) => this.state.pw = pw}
          returnKeyType={'done'}
          onSubmitEditing={Keyboard.dismiss}
          onScroll={Keyboard.dismiss}
          placeholderTextColor="#b2b1b0" 
          inputStyle={{
            color: 'white', 
            textAlign: 'center'
          }}
        />

        <LinkTouchableOpacity 
          title='Sign Up With Email' 
          clickFunction={this.handleEmailSubmit} 
        />

        <Text style={{
          padding: 20, 
          color: 'red', 
          fontSize: 15, 
          textAlign: 'center', 
        }}> 
          {this.state.error} 
        </Text>  
        <View style={{
            position: 'absolute', 
            bottom: 10, 
            left: Dimensions.get('window').width/2
        }}> 
          <LinkTouchableOpacity 
            title='Login Page' 
            clickFunction={this.props.loadLoginPage}
          />
        </View> 
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  formContainer : {
    flex : 1, 
    padding : 30, 
  }, 
  textInput: {
    color: 'white', 
    fontSize: 20, 
    height: 80,
    fontSize: 20,
    borderRadius: 20, 
  },
  decisionText: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight:20,
    fontSize:13
  }, 
});
