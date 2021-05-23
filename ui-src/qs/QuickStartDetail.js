import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Toast, Flex, WingBlank, Checkbox, Icon } from '@ant-design/react-native';

const CheckboxItem = Checkbox.CheckboxItem;

export default class QuickStartDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recordId: props.route.params.recordId
  };
}
  render() {
    return (
      <Button onPress={() => Toast.info('This is a toast tips')}>
                {this.state.recordId}
              </Button>
      

    )
  }
}


const styles = StyleSheet.create({
  
});