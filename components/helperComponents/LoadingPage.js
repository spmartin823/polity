import React from 'react';
import { Image, PanResponder, View, Text } from 'react-native';

import page from '../../assets/page.gif'

// console.disableYellowBox = true;

export default class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touching: false
    }
  }

  componentDidMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, loc) => {
        this.setState({touching : true});
        // could add extra information about where the touch is here. 
      },
      onPanResponderRelease: () => {
        this.setState({touching : false});
      },
      onPanResponderTerminate: () => {
        this.setState({touching : false});
      },
      onShouldBlockNativeResponder: () => false,
    });
  }


  render() {
    // console.log('these are the props in the LinkButton: ', this.props)
   return (
      <View style = {{
        flex: 1,     
        alignItems: 'center',
        justifyContent: 'center',
      }}> 
        <Image 
          source={page}
        /> 
        <Text style={{ color: this.props.textColor || 'white', fontSize: 15, textAlign: 'center' }}> 
          {this.props.loadingText || ""}
        </Text> 

        {this.state.touching 
          ? <Text style={{ color: 'red', fontSize: 30, textAlign: 'center' }}> 
              wait!
            </Text> 
          : null}
      </View>
    )
  }
}
