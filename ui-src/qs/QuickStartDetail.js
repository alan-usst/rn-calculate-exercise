import React, { Component } from 'react';
import { ScrollView, Text, View, DrawerLayoutAndroid } from 'react-native';
import { Button, Grid, Flex, WingBlank, List, Toast, Icon, Provider, Drawer } from '@ant-design/react-native';
import { RecordAPI } from '@api';
import { getOpStr } from '@util';
const Item = List.Item;

export default class QuickStartDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recordId: props.route.params.recordId,
      itemIndex: 1,
      itemDetail: null,
      recordDetail: null,
      filledAnswer: null
    };
  }

  getItemDetail = (recordDetail) => {
    return this.getItemDetailWithIndex(recordDetail, this.state.itemIndex);
  }

  getItemDetailWithIndex = (recordDetail, itemIndex) => {
    let tmp = recordDetail.items.filter((element, index, array) => {
      return element.index == itemIndex;
    });
    return tmp.length == 0 ? null : tmp[0];
  }

  refreshState = (recordDetailStr) => {
    let recordDetail = JSON.parse(recordDetailStr);
    console.log("recordDetail", recordDetail);
    let itemDetail = this.getItemDetail(recordDetail);
    this.setState({ itemDetail: itemDetail, recordDetail, recordDetail, filledAnswer: itemDetail.filledAnswer });
  }

  componentDidMount = () => {
    const { refreshState } = this;
    RecordAPI.getDetailById(this.state.recordId, function (args) {
      refreshState(args);
    });
    this.props.Home_Screen.refreshUnCompleteCount();
  }

  // 变更题目
  changeItem = (itemIndex) => {
    let itemDetail = this.getItemDetailWithIndex(this.state.recordDetail, itemIndex);
    this.setState({ itemIndex: itemIndex, itemDetail: itemDetail, filledAnswer: itemDetail.filledAnswer });
    this.drawer.closeDrawer();
  }

  genSingleItemInList = (item) => {
    // 题目列表中的状态，答对的为绿色，答错为红色
    let statusColor = item.status == "RIGHT" ? "#07bd09" : (item.status == "WRONG" ? "#e10305" : "#b0b5bd");
    return (
      <Item key={item.index} onPress={() => this.changeItem(item.index)}>
            <Flex justify="between" >
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{color: statusColor , textAlign: 'center' }}><Icon name="edit" style={{ color: statusColor }} />【{item.index}】</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{color: statusColor , textAlign: 'center' }}>{item.n1}  {getOpStr(item.op)} {item.n2}</Text>
                </Flex.Item>
            </Flex>
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
          <Item key={"title"}>
          <Flex justify="between" >
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>题目序号</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>内容</Text>
                </Flex.Item>
            </Flex>
          </Item>
          {items.map(element => {
            return this.genSingleItemInList(element);
          })}
        </List>
      </ScrollView>);
    }
  }

  // 消息提示栏-下一题
  goToNextItem=()=>{
    this.changeItem(this.state.itemIndex+1);
  }

  // 键盘输入回调
  numInput = (num) => {
    const { filledAnswer, itemDetail } = this.state;
    const {refreshState} = this;
    const refreshUnCompleteCount = this.props.Home_Screen.refreshUnCompleteCount;
    if(itemDetail.status == "RIGHT"){
      Toast.info("当前题目已经回答正确，请勿重复解答",1);
      return;
    }
    if (num == "delete") {
      itemDetail.status = "UNDO";
      if (filledAnswer != null) {
        if (filledAnswer < 10) {
          this.setState({ filledAnswer: null,itemDetail:itemDetail});
        } else {
          this.setState({ filledAnswer: Math.round(filledAnswer/10),itemDetail:itemDetail});
        }
      }
    } else if (num == "confirm") {
      const {recordId, itemIndex, recordDetail,filledAnswer} = this.state;
      let items = recordDetail.items;
      items.forEach(ele => {
        if(ele.index == itemIndex){
          ele["filledAnswer"] = filledAnswer;
        }
      });
      RecordAPI.submitSingleItem(recordId, itemIndex, JSON.stringify(items),function (args) {
        refreshState(args);
        refreshUnCompleteCount();
      });
    } else {
      if (filledAnswer == null) {
        this.setState({ filledAnswer: num });
      } else if (filledAnswer > 10000) {
        Toast.fail('结果长度过长，请删除一些再输入', 1);
      } else {
        this.setState({ filledAnswer: filledAnswer * 10 + num });
      }
    }
  }

  render() {
    const { itemDetail, filledAnswer, itemIndex, recordDetail} = this.state;
    // 计算提示栏的样式和提示内容
    // 是否展示下一题的按钮
    let ifShowNextItem = false;
    let msgColor = "black";
    let msgContent = null;
    if(itemDetail!=null && itemDetail.status!="UNDO"){
      if(itemDetail.status=="RIGHT"){
        msgColor = "#07bd09";
        msgContent = "回答正确!";
        ifShowNextItem = itemIndex<recordDetail.itemAmount;
      }else{
        msgColor = "#e10305";
        msgContent = "答错啦，再好好想想";
      }
    }
    return (
      <Provider>
        <Drawer
          drawerRef={el => (this.drawer = el)}
          drawerWidth={250}
          position={"right"}
          open={false}
          sidebar={this.genItemList()}
          >
          <ScrollView
            // style={{ flex: 1 }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <WingBlank style={{ marginBottom: 0, marginTop: 5 }}>
              <Flex direction="row" style={{ paddingTop: 20 }}>
                <Flex.Item style={{ paddingLeft: 4 }}>
                  <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>总题数：{this.state.recordDetail == null ? 0 : this.state.recordDetail.itemAmount}</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 15 }}>
                  <Text style={{ color: '#00ce00', fontSize: 15, fontWeight: 'bold' }}>答对：{this.state.recordDetail == null ? 0 : this.state.recordDetail.rightCount}</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4 }}>
                  <Text style={{ color: '#fa2e3e', fontSize: 15, fontWeight: 'bold' }}>答错：{this.state.recordDetail == null ? 0 : this.state.recordDetail.wrongCount}</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Text style={{ color: '#9f9898', fontSize: 15, fontWeight: 'bold' }}>未开始：{this.state.recordDetail == null ? 0 : this.state.recordDetail.itemAmount - this.state.recordDetail.rightCount - this.state.recordDetail.wrongCount}</Text>
                </Flex.Item>
              </Flex>

              <Flex direction="row" style={{ paddingTop: 50 }} justify='around' >
                <Flex.Item >
                  <Text style={{ color: '#000', fontSize: 23, fontWeight: 'bold', textAlign: 'center' }}>当前第 {this.state.itemIndex} 题</Text>
                </Flex.Item>
                <Flex.Item style={{}}>
                  <Button onPress={() => {
                    this.drawer.openDrawer();
                  }}
                    type='ghost' size='large' style={{
                      maxWidth: 150,
                      minWidth: 100,
                      wordWrap: 'break-word'
                    }}>查看题目列表</Button>
                </Flex.Item>
              </Flex>
              {/*公式栏*/}
              <View style={{ paddingTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#000', fontSize: 40, fontWeight: 'bold' }}>{itemDetail == null ? null : `${itemDetail.n1}  ${getOpStr(itemDetail.op)}  ${itemDetail.n2}  =  ${filledAnswer == null ? ' ? ' : filledAnswer}`}</Text>
              </View>

              <View style={{ paddingTop: 30, justifyContent: 'center', flexDirection:'row'}}>
                <Text style={{ color: msgColor, fontSize: 30, fontWeight: 'bold' }}>{msgContent}</Text> 
                {ifShowNextItem?<Button onPress={this.goToNextItem} style={{marginLeft:40}}>下一题</Button>:null}
              </View>
            </WingBlank>
          </ScrollView>
          <Grid
            data={[{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }, { text: '7' }, { text: '8' }, { text: '9' }, { icon: 'double-left' }, { text: '0' }, { icon: 'check' }]}
            columnNum={3}
            onPress={(_el, index) => this.numInput(getNumByIndex(index))}
            itemStyle={{ height: 70, borderColor: '#a9a6b2' }}
            renderItem={(el, index) => {
              let num = getNumByIndex(index);
              if (num == "delete") {
                return <Icon name="double-left" style={{ flex: 1, textAlignVertical: 'center', textAlign: 'center', backgroundColor: '#e10305', color: 'white' }} />;
              } else if (num == "confirm") {
                return <Icon name="check" style={{ flex: 1, textAlignVertical: 'center', textAlign: 'center', backgroundColor: '#07bd09', color: 'white' }} />
              } else {
                return <Text style={{ flex: 1, fontSize: 30, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>{num}</Text>
              }
            }}
          />
        </Drawer>
      </Provider>
    )
  }
}

const getNumByIndex = (index) => {
  if (index == 9) {
    return "delete"
  } else if (index == 11) {
    return "confirm"
  } else if (index == 10) {
    return 0;
  }
  else {
    return index + 1;
  }
}