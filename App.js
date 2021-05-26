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
      <NavigationContainer
      header={{visible:false}}
      visible={false}
      >
        <Stack.Navigator
          headerMode={null}
          initialRouteName="home">
          <Stack.Screen
            name="home"
          >
            {props => <Home {...props} ref={(e) => this.Home_Screen = e} />}
          </Stack.Screen>
          <Stack.Screen
          headerBackTitle={null}
            name="qs_detail"
            options={{ gesturesEnabled:true}}>
            {props => <QuickStartDetail {...props} Home_Screen={this.Home_Screen} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}