import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Button, Provider, Toast, Icon, SearchBar, TabBar } from '@ant-design/react-native';

import { Home } from './ui-src';


export default class App extends Component {
  render() {
      return (
          <NavigationContainer>
            <Text>hhhh</Text>
                  {/* <Stack.Screen name="Home" component={Home} /> */}
          </NavigationContainer>
      );
  }
}