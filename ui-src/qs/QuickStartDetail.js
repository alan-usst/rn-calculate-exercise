import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Toast, Flex, WingBlank, Checkbox, Icon } from '@ant-design/react-native';

const CheckboxItem = Checkbox.CheckboxItem;

export default class QuickStartDetail extends Component {

  state = {

  };


  render() {
    return (
      <Button onPress={() => Toast.info('This is a toast tips')}>
                QuickStartDetail
              </Button>
      

    )
  }
}


const styles = StyleSheet.create({
  
});