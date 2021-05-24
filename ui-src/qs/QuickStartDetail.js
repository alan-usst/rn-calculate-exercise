import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Toast, Flex, WingBlank, Checkbox, Icon } from '@ant-design/react-native';
import { QuickStartAPI } from '@api';

export default class QuickStartDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recordId: props.route.params.recordId,
      itemIndex: 1,
      itemDetail: null,
      recordDetail: null,
      statisticsInfo: null,
    };
  }

  getItemDetail = (recordDetail) => {
    console.log("this.state.itemIndex", this.state.itemIndex);
    let tmp = recordDetail.items.filter((element, index, array) => {
      return element.index == this.state.itemIndex
    });
    return tmp.length == 0 ? null : tmp[0];
  }

  refreshState = (recordDetailStr) => {
    let recordDetail = JSON.parse(recordDetailStr);
    let itemDetail = this.getItemDetail(recordDetail);
    this.setState({ itemDetail: itemDetail, recordDetail, recordDetail, statisticsInfo: recordDetail.statisticsInfo });
  }

  componentDidMount = () => {
    const { refreshState } = this;
    QuickStartAPI.getRecordDetailById(this.state.recordId, function (args) {
      refreshState(args);
    });
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <WingBlank style={{ marginBottom: 0, marginTop: 0 }}>
          <Flex direction="row" style={{paddingTop:20}}>
            <Flex.Item style={{ paddingLeft: 4 }}>
              <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>总题数：{this.state.statisticsInfo == null ? 0 : this.state.statisticsInfo.total}</Text>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 15 }}>
              <Text style={{ color: '#00ce00', fontSize: 15, fontWeight: 'bold' }}>答对：{this.state.statisticsInfo == null ? 0 : this.state.statisticsInfo.rightCount}</Text>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4 }}>
              <Text style={{ color: '#fa2e3e', fontSize: 15, fontWeight: 'bold' }}>答错：{this.state.statisticsInfo == null ? 0 : this.state.statisticsInfo.wrongCount}</Text>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <Text style={{ color: '#9f9898', fontSize: 15, fontWeight: 'bold' }}>未开始：{this.state.statisticsInfo == null ? 0 : this.state.statisticsInfo.undoCount}</Text>
            </Flex.Item>
          </Flex>

          <Flex direction="row" style={{ paddingTop: 30 }} justify='around' >
            <Flex.Item >
              <Text style={{ color: '#000', fontSize: 23, fontWeight: 'bold', textAlign: 'center' }}>当前第 {this.state.itemIndex} 题</Text>
            </Flex.Item>
            <Flex.Item style={{}}>
              <Button onPress={() => {
                Toast.info('This is a toast tips');
                console.log("查看题目列表")
              }}
                type='ghost' size='large' style={{maxWidth:150,
                  minWidth: 100,
                  wordWrap: 'break-word'}}>查看题目列表</Button>
            </Flex.Item>
          </Flex>

          {/* <Button onPress={() => Toast.info('This is a toast tips')}>
            {this.state.recordId}
          </Button> */}
        </WingBlank>
      </ScrollView>



    )
  }
}


const styles = StyleSheet.create({

});