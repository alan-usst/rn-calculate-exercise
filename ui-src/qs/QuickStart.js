import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {Button, Provider, Toast } from '@ant-design/react-native';

export default class QuickStart extends Component {
  render() {
    return(
      
        <Button onPress={() => Toast.info('This is a toast tips')}>
          QuickStart
        </Button>
    )
  }
}