import Expo from 'expo'
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Keyboard, TextInput } from 'react-native';
import firebase from 'firebase'
import axios from 'axios'

import { localhost, serverUrl } from '../../config/serverConfig'
import LoadingPage from '../helperComponents/LoadingPage'
import LinkTouchableOpacity from '../helperComponents/LinkTouchableOpacity'

console.disableYellowBox = true;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error : "", 
      username : "", 
      pw : "", 
      loading: false
    }; 
    this.handleBcryptSubmit = this.handleBcryptSubmit.bind(this)
  }

  handleBcryptSubmit() {
    // this takes in the username and password provided and passes the login 
    // information to the app to store whether the user is authenticated or not. 
    axios.post(`${localhost}/users`, {
      username: this.state.username,
      password: this.state.pw
    })
      .then((response) => {
        if (response.data.error === undefined) {
          console.log('Logged in with bcrypt successfully')
          this.props.passAuthedStatus(true)
        } else {
          this.setState({error: response.data.error})
        }
      }) 
      .catch(function (error) {
        console.log('there was an error')
      })
  }


  render() {
    return (this.state.loading && !this.state.error
    ? <LoadingPage loadingText={"logging in..."}/>  
    : <View> 
        <View style={{
          position: 'absolute', 
          backgroundColor: 'rgba(0,0,0,0.1)'
        }} /> 
        <View style={styles.formContainer}> 
          {/* This is the bcrypt auth*/}
          
            <TextInput
              style={styles.textInput}
              autoCapitalize={"none"}
              autoFocus={true}
              autoCorrect={false}
              onChangeText={(text) => this.state.username = text} 
              returnKeyType={'done'}
              onSubmitEditing={Keyboard.dismiss}
              onScroll={Keyboard.dismiss}
              placeholderTextColor="#b2b1b0"
              placeholder="Enter Your Username"
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
              placeholderTextColor="#b2b1b0"
              onChangeText={(pw) => this.state.pw = pw} 
              returnKeyType={'done'}
              onSubmitEditing={Keyboard.dismiss}
              onScroll={Keyboard.dismiss}
              inputStyle={{
                color: 'white', 
                textAlign: 'center'
              }}
            />

            <LinkTouchableOpacity 
              title='Login' 
              clickFunction={this.handleBcryptSubmit} 
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
              title='Signup' 
              clickFunction={this.props.loadSignupPage}
            />
          </View> 
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
});
