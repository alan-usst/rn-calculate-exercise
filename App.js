import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Button from '@ant-design/react-native/lib/button';

export default class App extends Component {
  render() {
    return <Button>Start</Button>;
  }
}

AppRegistry.registerComponent('App', () => App);