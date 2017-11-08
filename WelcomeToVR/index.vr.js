import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
    Animated,
} from 'react-vr';

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }
    render() {
        return (
            <Animated.Image                         // Base: Image, Text, View
                source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                onEnter={() => this.setState({textColor: 'red'})}
                onExit={() => this.setState({textColor: 'white'})}
                style={{
                    flex: 1,
                    width: 1,
                    height: 1,
                    transform: [                        // `transform` is an ordered array
                        {scale: this.state.bounceValue},{rotateY: 20},{translate: [-1, 2, -2.4]},  // Map `bounceValue` to `scale`
                    ]
                }}
            />
        );
    }
    componentDidMount() {
        this.state.bounceValue.setValue(1.1);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                toValue: 1,                         // Animate to smaller size
                friction: 0.0,                          // Bouncier spring
            }
        ).start();                                // Start the animation
    }
}

export default class WelcomeToVR extends React.Component {
    constructor() {
        super();

        this.state = {textColor: 'white'};
    }
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '200',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello you
        </Text>
        <Playground />
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'blue', transform: [{rotateY: -10},{translate: [-1, 1, -2]}]}}>
              <Text style={{fontSize: 0.2, textAlign: 'center'}}>Blue</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'orange', transform: [{rotateY: -20},{translate: [-1, 1, -2]}]}}>
              <Text onEnter={() => this.setState({textColor: 'red'})}
                    onExit={() => this.setState({textColor: 'white'})}
                    style={{fontSize: 0.2, textAlign: 'center', color:this.state.textColor}}>Orange</Text>
          </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
