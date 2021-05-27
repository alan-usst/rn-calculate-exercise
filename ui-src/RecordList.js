import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { Button, Provider, Toast, Icon, Flex, ListView, List } from '@ant-design/react-native';

import { RecordAPI } from '@api';
import { getOpListStr } from '@util';
import Swipeout from "react-native-swipeout";

const Item = List.Item;

var width = Dimensions.get('window').width;

var height = Dimensions.get('window').height;


export default class RecordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            fresh: true,
            animating: true,
            nomore: false,
            pageSize: 0,
            pageNumber: 1,
        };
    }

    // static propTypes = {
    //     data: PropTypes.array,
    //     keyExtractor: PropTypes.func,
    //     onEndReached: PropTypes.func,
    //     renderItem: PropTypes.func,
    //     ItemSeparatorComponent: PropTypes.func,
    //     ListEmptyComponent: PropTypes.func,
    //     ListFooterComponent: PropTypes.func,
    //     refreshing: PropTypes.bool,
    //     colors: PropTypes.array,
    //     progressBackgroundColor: PropTypes.string,
    //     onRefresh: PropTypes.func,
    //     animating: PropTypes.bool,
    //     nomore: PropTypes.bool,
    //     ItmeHeight: PropTypes.number,
    
    //   };

    //满屏页面判断
    fullScreenJusting = (ItemHeight) => {
        const screnHeight = height;     //屏幕高度
        console.log("屏幕高度", screnHeight);
        //计算列表个数
        const listNum = (screnHeight - 40) / ItemHeight;
        console.log("listNum", listNum)
        return Math.ceil(listNum);
    }

    setStateDataNomoreInfo = (data, nomore) => {
        this.setState({ data: data, nomore: nomore });
    }
    componentDidMount = () => {
        const ListNums = this.fullScreenJusting(50);
        this.setState({
            pageSize: ListNums
        })
        this.onEndReachedCalled = false;
        this.getOrderList(ListNums, 1, true);
    }

    // 滑动按钮
    swipeoutBtns = (recordId) => [
        {
            text: '删除',
            type: 'delete',
            onPress: () => this.deleteRecord(recordId)
        }
    ]

    removeRcordInState = (recordId) => {
        const { data } = this.state;
        this.setState({ data: data.filter(item => item.id !== recordId) });
    }

    deleteRecord = (recordId) => {
        const { removeRcordInState } = this;
        const {Home_Screen} = this.props;
        console.log("this.props",this.props);
        RecordAPI.delete(recordId, function (deleteCount) {
            if (deleteCount < 1) {
                Toast.fail("系统异常，删除失败", 1);
                return;
            }
            removeRcordInState(recordId);
            Home_Screen.refreshUnCompleteCount();
        });
    }

    _onRefresh = () => {
        this.setState({ nomore: false, pageNumber: 1 }, () => {
            this.getOrderList(this.state.pageSize, 1, true);
        })
    }

    _onEndReached = () => {
        if (!this.state.nomore && this.onEndReachedCalled ) {
          this.getOrderList(this.state.pageSize, ++this.state.pageNumber, false);
        }
        this.onEndReachedCalled=true;
    
      };

    ListFooterComponent = () => {
        return (
          <View style={styles.bottomfoot}>
            {
              this.state.data.length != 0 ?
                this.state.nomore ? (
                  <Text style={styles.footText}>- 没有更多记录啦 -</Text>
                ) : (
                    <View style={styles.activeLoad}>
                      <ActivityIndicator size="small" animating={this.state.animating} />
                      <Text style={[styles.footText, styles.ml]}>加载更多...</Text>
                    </View>
                  )
                :
                null
            }
    
          </View>
        );
      };
      //为空时
      ListEmptyComponent=()=>{
        return (
          <View style={styles.noListView}>
            {/* <Image
              style={styles.noListImage}
              source={require('../images/status/order_no_record.png')}
            /> */}
            <Text style={styles.NoListText}>暂无练习记录</Text>
          </View>
        );
      }

    getOrderList = (ListNums, pageNumber, fresh) => {
        let nomore;
        console.log("pageNumber", pageNumber)
        const { setStateDataNomoreInfo } = this;
        const { data } = this.state;
        RecordAPI.getOverviewList(pageNumber, ListNums, function (args) {
            let dataNew = JSON.parse(args);
            if (dataNew.length < ListNums) {
                nomore = true
            } else {
                nomore = false
            }
            if (fresh) {
                setStateDataNomoreInfo(dataNew, nomore);
            } else {
                setStateDataNomoreInfo(data.concat(dataNew), nomore);
            }
        });
    }

    go2RecordDetail = (recordId) => {
        this.props.navigation.navigate('qs_detail', { recordId: recordId });
    }

    renderItem = (item) => {

        let undoCount = item.itemAmount - item.rightCount - item.wrongCount;
        return (
            <Swipeout key={"swipeout_" + item.id} right={this.swipeoutBtns(item.id)} >
                <Item key={item.id} onPress={() => this.go2RecordDetail(item.id)}>
                    <Flex justify="between" >
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{ textAlign: 'center' }}>{item.createTime}</Text>
                        </Flex.Item>
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{ textAlign: 'center' }}>{getOpListStr(item.ops).join("  ")}</Text>
                        </Flex.Item>
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{ textAlign: 'center' }}>{item.itemAmount}</Text>
                        </Flex.Item>
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{ textAlign: 'center' }}>{item.rightCount < item.itemAmount ? (<Text><Icon color="#f90" size={12} name="info-circle" />  </Text>) : null}<Text style={{ color: '#00ce00' }}>{item.rightCount}</Text>/<Text style={{ color: '#fa2e3e' }}>{item.wrongCount}</Text>/<Text style={{ color: '#bbbcbf' }}>{undoCount}</Text></Text>
                        </Flex.Item>
                    </Flex>
                </Item>
            </Swipeout>
        );
    };

    render() {
        const title = () => (<Item style={{ padding: 10 }}>
            <Flex justify="between" >
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>创建日期</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>运算逻辑</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>题量</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>进度</Text>
                </Flex.Item>
            </Flex>
        </Item>);
        return (
            <View style={{ paddingBottom: 70 }}>
                {title()}
                <FlatList 
                    //加载数据源
                    data={this.state.data}
                    //展示数据
                    renderItem={({ index, item }) => this.renderItem(item)}
                    //默认情况下每行都需要提供一个不重复的key属性
                    keyExtractor={(item, index) => (item.id)}
                    //空值时的数据
                    ListEmptyComponent={this.ListEmptyComponent}
                    //底部栏
                    ListFooterComponent={this.ListFooterComponent}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    //刷新
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor={"#ffffff"}
                            onRefresh={() => {
                                this._onRefresh();
                            }}
                        />
                    }
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    listConten: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffff',
      height: 50,
    },
    baseLine: {
      width: width,
      height: 1,
      backgroundColor: '#eeeeee',
    },
    noListView: {
      width: width,
      height: height - 140,
      justifyContent: 'center',
      alignItems: 'center',
    },
    NoListText: {
      marginTop: 15,
      fontSize: 18,
      color: '#999999',
    },
    noListImage: {
      width: 130,
      height: 140,
    },
    bottomfoot: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    footText: {
      marginTop: 5,
      fontSize: 12,
      color: '#999999',
    },
  
    activeLoad: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ml: {
      marginLeft: 10,
    },
  });
  