import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, Menu, View, DrawerLayoutAndroid, TouchableHighlight } from 'react-native';
import { Button, Toast, Flex, WingBlank, List, WhiteSpace, Icon } from '@ant-design/react-native';
import { QuickStartAPI } from '@api';
const Item = List.Item;
const Brief = Item.Brief;

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


  onOpenChange = isOpen => {
    /* tslint:disable: no-console */
    console.log('是否打开了 Drawer', isOpen.toString());
  };

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

  getOpStr = (opEnum) => {
    if (opEnum == "ADD") {
      return "＋";
    } else if (opEnum == "SUB") {
      return "－";
    } else if (opEnum == "MUL") {
      return "×";
    } else if (opEnum == "DIV") {
      return "÷";
    }
    return "";
  }

  genSingleItemInList = (item) => {
    // 题目列表中的状态，答对的为绿色，答错为红色
    let statusColor = item.status == "RIGHT" ? "#00ca00" : (item.status == "WRONG" ? "#f00" : "#b0b5bd");
    return (
      <Item key={item.index} onPress={() => { Toast.info("!2312312312") }}>
        <View style={{ flexDirection: 'row', color: statusColor}}>
          <Icon name="edit" style={{color: statusColor}}/><Text style={{color: statusColor}}>【{item.index}】      {item.n1}  {this.getOpStr(item.op)} {item.n2}</Text>
        </View>
      </Item>
    );
  }

  genItemList = () => {
    let items = this.state.recordDetail == null ? null : this.state.recordDetail.items;
    if (items != null) {
      return (<ScrollView
        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List>
          {items.map(element => {
            return this.genSingleItemInList(element);
          })}
        </List>
      </ScrollView>);
    }
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={200}
        drawerPosition={"right"}
        renderNavigationView={() => this.genItemList()}>
        <ScrollView
          // style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <WingBlank style={{ marginBottom: 0, marginTop: 0 }}>
            <Flex direction="row" style={{ paddingTop: 20 }}>
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
                  console.log("查看题目列表");
                  this.drawer.openDrawer();
                }}
                  type='ghost' size='large' style={{
                    maxWidth: 150,
                    minWidth: 100,
                    wordWrap: 'break-word'
                  }}>查看题目列表</Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </ScrollView>
      </DrawerLayoutAndroid>



    )
  }
}