import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Button, Provider, Toast, Icon, Flex, ListView, List } from '@ant-design/react-native';

import { RecordAPI } from '@api';
import { getOpListStr } from '@util';

const Item = List.Item;

export default class RecordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: 'grid',
        };
    }
    sleep = (time) =>
        new Promise(resolve => setTimeout(() => resolve(), time));
    onFetch = async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            let pageLimit = 10;
            RecordAPI.getOverviewList(page, pageLimit, function (args) {
                console.log("pageIndex", page)
                console.log("pageLimit", pageLimit)
                let rowData = JSON.parse(args);
                console.log("rowData", rowData)
                startFetch(rowData, pageLimit);
            });
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
        }
    };

    renderItem = (item) => {
        return (
            <Item key={item.id} style={{ padding: 10 }}>
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
                        <Text style={{ textAlign: 'center' }}><Text style={{ color: '#00ce00' }}>{item.rightCount}</Text>/<Text style={{ color: '#fa2e3e' }}>{item.wrongCount}</Text>/<Text style={{ color: '#bbbcbf' }}>{item.itemAmount - item.rightCount - item.wrongCount}</Text></Text>
                    </Flex.Item>
                </Flex>
            </Item>
        );
    };


    render() {
        return (
            <Provider>
                <Item style={{ padding: 10 }}>
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
                            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>完成情况</Text>
                        </Flex.Item>
                    </Flex>
                </Item>
                <ListView
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) =>
                        item.id
                    }
                    renderItem={this.renderItem}
                    numColumns={1}
                >
                </ListView>
            </Provider>
        );
    }
}