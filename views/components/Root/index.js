import React, { Component } from 'react';
import { View } from 'react-native';
import Navigation from '../Navigation';
import StatusBar from '../StatusBar';
import styles, { StatusBarBackgroundColor } from './styles';

class Root extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          backgroundColor={StatusBarBackgroundColor}
          barStyle='light-content'
        />
        <Navigation />
      </View>
    );
  }
}

export default Root;
