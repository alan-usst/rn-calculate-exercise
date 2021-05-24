import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Provider, Toast, Icon, SearchBar, TabBar } from '@ant-design/react-native';
import { Home, QuickStartDetail } from './ui-src';
import PickerViewExample from './PickerViewExample';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home">
          <Stack.Screen
            name="home"
            options={{ title: null }}
            component={Home} />
          <Stack.Screen
            name="qs_detail"
            options={{ title: null }}
            component={QuickStartDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}