import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Toast, Flex, WingBlank, Checkbox, Icon, PickerView } from '@ant-design/react-native';
import a from '@ant-design/react-native/lib/modal/operation';
import { RecordAPI } from '@api';

export default class QuickStart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opAdd: false,
      opSub: false,
      opMul: false,
      opDiv: false,
      maxNum: 10,
      itemAmount: 10
    };
  }


  confirm = () => {
    const { opAdd, opSub, opMul, opDiv, maxNum, itemAmount } = this.state;
    let ops = [];
    if (opAdd) {
      ops.push("ADD");
    }
    if (opSub) {
      ops.push("SUB");
    }
    if (opMul) {
      ops.push("MUL");
    }
    if (opDiv) {
      ops.push("DIV");
    }
    if (ops.length == 0) {
      Toast.fail('至少选择一种运算符', 1)
      return;
    }
    console.log("ops", ops);
    console.log("maxNum", maxNum);
    console.log("itemAmount", itemAmount);

    
    const {navigation} = this.props;
    RecordAPI.add(ops, maxNum, itemAmount, function (args) {
      console.log("rn java call back, 新增的记录id", args)
      // 回调方法中调用组件的props 得到的都是null
      // this.props.navigation.navigate('qs_detail');
      navigation.navigate('qs_detail', {recordId: args});
    });

  }

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

        <WingBlank style={{ marginBottom: 0, marginTop: 0 }}>
          <Flex direction="column" >

            {/* 运算类型 */}
            <Flex.Item style={{ paddingTop: 0 }}>
              <Text style={styles.titleText} >运算类型</Text>
            </Flex.Item>
            <Flex.Item style={{ paddingTop: 10 }}>
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
                  color: '#1478e3',
                  fontSize: 30,
                  paddingLeft: 10
                }}>÷</Text></Checkbox>
              </Flex>
            </Flex.Item>

            {/* 最大运算值 */}
            <Flex.Item style={{ paddingTop: 20 }}>
              <Text style={styles.titleText} >运算最大值
              </Text>
              <PickerView
                onChange={(item) => { this.setState({ maxNum: item[0] }); }}
                value={[this.state.maxNum]}
                data={[[{ label: '10 以内', value: 10 }, { label: '20 以内', value: 20 }, { label: '50 以内', value: 50 }, { label: '100 以内', value: 100 }]]}
                cascade={false} />
            </Flex.Item>

            {/* 题量 */}
            <Flex.Item style={{ paddingTop: 20 }}>
              <Text style={styles.titleText} >题量
              {/* <Button style={styles.titleText} onPress={() => { Toast.info("例如：进行10以内加减法，则输入10") }}><Icon name="question-circle-o" /></Button> */}
              </Text>
              <PickerView
                onChange={(item) => { this.setState({ itemAmount: item[0] }); }}
                value={[this.state.itemAmount]}
                data={[[{ label: '10题', value: 10 }, { label: '20题', value: 20 }, { label: '50题', value: 50 }]]}
                cascade={false} />
            </Flex.Item>

            {/* 确认按钮 */}
            <Flex.Item style={{ paddingTop: 0 }}>
              <Button type="primary"
                onPress={this.confirm}>
                开    始
            </Button>
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
  checkedOp: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    color: '#1478e3',
    fontSize: 20,
  },
  checkedOpVal: {
    color: '#1478e3',
    fontSize: 30,
    paddingLeft: 10,
    paddingRight: 30
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