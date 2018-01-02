import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions } from 'react-native';

/*
TODO: 
  refactor the renderDraggable to it's own component (Piece)
  add props to the renderDraggable that determine it's size, current position, etc.
  
*/
export default class GameBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      showDraggable : true,  
      dropZoneValues : null, 
    };

    this.panResponder = PanResponder.create({    
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove : Animated.event([null,{ 
          dx : this.state.pan.x,
          dy : this.state.pan.y
      }]),
      onPanResponderRelease : (e, gesture) => {
        // need to add conditional here to determine where the piece is, and to 
        // either snap to a square (by rerendering the piece in the location) or
        // to snap back to a given piece corral location. 
        if (this.isDropZone(gesture)) {
          this.setState({showDraggable : false})
        } else {
          Animated.spring(
            this.state.pan, 
            {toValue: 
              // this is the return values. These need to be passed down in props
              // to match the starting postion. 
              { 
                x: 0, 
                y: 0,
              }
            }
          ).start()
        }

      } 
    });
    this.setDropZoneValues = this.setDropZoneValues.bind(this)
  }

  setDropZoneValues(e) { 
    this.setState({ dropZoneValues : e.nativeEvent.layout })
  }

  // should change this to be: 'identifyDropZone' so that the square that the user
  // is in can be identified. 
  isDropZone(gesture) {
    let dz = this.state.dropZoneValues;
    console.log('this is the state for the dropZoneValues in isDropZone: ', this.state.dropZoneValues)
    // this is not set up correctly yet.
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;

        //     (gesture.moveY > dz.y) 
        // && (gesture.moveY < dz.y + dz.height) 
        // && (gesture.moveX > dz.x) 
        // && (gesture.moveX < dz.x + dz.width)
  }

  renderDraggable (){
    return this.state.showDraggable ? (
      <View style={styles.draggableContainer}>
        <Animated.View 
          {...this.panResponder.panHandlers}                       
          style={[this.state.pan.getLayout(), styles.circle]}
        >     
          <Text style={styles.text}>Drag me!</Text>
        </Animated.View>
      </View>
    ) : null
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      {/* What goes below could also be factored out into it's own game square 
          component */}
        <View style={styles.dropZone}
          onLayout={this.setDropZoneValues}
          style={styles.dropZone}
        >
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        {this.renderDraggable()}
      </View>
    );
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone    : {
    height         : 100,
    width          : 100, 
    backgroundColor:'#2c3e50'
  },
  text        : {
    marginTop   : 25,
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  },
  draggableContainer: {
    position : 'absolute',
    top      : Window.height/2 - CIRCLE_RADIUS,
    left     : Window.width/2 - CIRCLE_RADIUS,
  },
  circle      : {
    backgroundColor : '#1abc9c',
    width           : CIRCLE_RADIUS*2,
    height          : CIRCLE_RADIUS*2,
    borderRadius    : CIRCLE_RADIUS
  }
});