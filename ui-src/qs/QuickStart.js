import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Toast, Flex, WingBlank, Checkbox, Icon } from '@ant-design/react-native';

const CheckboxItem = Checkbox.CheckboxItem;

export default class QuickStart extends Component {
  // static propTypes = {
  //   hideTabBar: React.PropTypes.func().isRequired,
  //   showTabBar: React.PropTypes.func().isRequired
  // };
  state = {
    opAdd: false,
    opSub: false,
    opMul: false,
    opDiv: false,
    maxNum: 10,
    agreeItem1: true,
    checkboxItem1: true,
  };


  render() {
    return (
      // <Button onPress={() => Toast.info('This is a toast tips')}>
      //           QuickStart
      //         </Button>
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <WingBlank style={{ marginBottom: 20, marginTop: 20 }}>
          <Flex direction="column" >

            {/* 运算类型 */}
            <Flex.Item style={{ paddingTop: 30 }}>
              <Text style={styles.titleText} >运算类型</Text>
            </Flex.Item>
            <Flex.Item style={{ paddingTop: 20 }}>
              <Flex direction="row" automaticallyAdjustContentInsets={true} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Checkbox
                  checked={this.state.opAdd}
                  style={styles.checkedOp}
                  onChange={event => {
                    this.setState({ opAdd: event.target.checked });
                  }}
                ><Text style={styles.checkedOpVal}>+</Text></Checkbox>
                <Checkbox
                  checked={this.state.opSub}
                  style={styles.checkedOp}
                  onChange={event => {
                    this.setState({ opSub: event.target.checked });
                  }}
                ><Text style={styles.checkedOpVal}>－</Text></Checkbox>
                <Checkbox
                  checked={this.state.opMul}
                  style={styles.checkedOp}
                  onChange={event => {
                    this.setState({ opMul: event.target.checked });
                  }}
                ><Text style={styles.checkedOpVal}>×</Text></Checkbox>
                <Checkbox
                  checked={this.state.opDiv}
                  style={styles.checkedOp}
                  onChange={event => {
                    this.setState({ opDiv: event.target.checked });
                  }}
                ><Text style={{
                  color: 'blue',
                  fontSize: 30,
                  paddingLeft: 10
                }}>÷</Text></Checkbox>
              </Flex>
            </Flex.Item>

            {/* 最大运算值 */}
            <Flex.Item style={{ paddingTop: 50}}>
              <Text style={styles.titleText} >运算最大值<Button onPress={()=>{Toast.info("例如：进行10以内加减法，则输入10。最大不超过999")}}><Icon name="question-circle-o" /></Button></Text>
              <TextInput style={styles.inputItem} defaultValue='10' maxLength={3} keyboardType="numeric" 
              onBlur={event=>{this.setState({maxNum:event.text}); 
              this.props.showTabBar();
            }}
              onFocus={event=>{
                this.props.hideTabBar();}}
              />
            </Flex.Item>
            <Flex.Item style={{ paddingBottom: 4 }}>
              <Button size="small">按钮2</Button>
            </Flex.Item>
            <Flex.Item style={{ paddingBottom: 4 }}>
              <Button size="small">按钮3</Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </ScrollView>

    )
  }
}


const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    marginTop: 35,
    marginLeft: 5,
    marginRight: 5,
  },
  checkedOp: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    color: 'blue',
    fontSize: 20,
  },
  checkedOpVal: {
    color: 'blue',
    fontSize: 30,
    paddingLeft: 10,
    paddingRight: 30
  },
  inputItem: {
    marginTop:10,
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  titleText: {
    color: '#FF7700',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: '#C0C0C0',
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
});