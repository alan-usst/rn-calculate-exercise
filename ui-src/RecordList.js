import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AlertIOS,
    Dimensions
} from 'react-native';
import { Button, Provider, Toast, Icon, Flex, ListView, List } from '@ant-design/react-native';

import { RecordAPI } from '@api';
import { getOpListStr } from '@util';
import Swipeout from "react-native-swipeout";

const Item = List.Item;

var width = Dimensions.get('window').width;


export default class RecordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }
    setStateInfo = (rows) => {
        this.setState({ rows: rows });
    }
    componentDidMount = () => {
        const { setStateInfo } = this;
        RecordAPI.getOverviewList(1, 100, function (args) {
            let rowData = JSON.parse(args);
            setStateInfo(rowData);
        });
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
        const {rows} = this.state;
        this.setState({rows: rows.filter(item=>item.id!==recordId)});
    }

    deleteRecord = (recordId) => {
        const { removeRcordInState } = this;
        RecordAPI.delete(recordId, function (deleteCount) {
            if (deleteCount < 1) {
                Toast.fail("系统异常，删除失败", 1);
                return;
            }
            removeRcordInState(recordId);
        });
    }

    onFetch = async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            let pageLimit = 10;
            RecordAPI.getOverviewList(page, pageLimit, function (args) {
                let rowData = JSON.parse(args);
                startFetch(rowData, pageLimit);
            });
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
        }
    };

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
            <View>
                {title()}
            <FlatList style={{marginBottom:30}}
                //加载数据源
                data={this.state.rows}
                //展示数据
                renderItem={({ index, item }) => this.renderItem(item)}
                //默认情况下每行都需要提供一个不重复的key属性
                keyExtractor={(item, index) => (item.id)}
            />  

            </View>
            
            // <ListView
            //     legacyImplementation={true}
            //     header={title}
            //     onFetch={this.onFetch}
            //     keyExtractor={(item, index) =>
            //         item.id
            //     }
            //     allLoadedText={'没有更多数据了'}
            //     waitingSpinnerText={'加载中...'}
            //     // refreshable={true}
            //     renderItem={this.renderItem}
            //     numColumns={1}
            // >
            // </ListView>
        );
    }
}