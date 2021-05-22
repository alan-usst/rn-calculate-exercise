import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {Button, Provider, Toast } from '@ant-design/react-native';

import {QuickStart} from './ui-src';

export default class App extends Component {
  render() {
    return(
      <Provider>
        <QuickStart/>

        <Button onPress={() => Toast.info('This is a toast tips')}>
          Start
        </Button>
      </Provider>
    )
  }
}