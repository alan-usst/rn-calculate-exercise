import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Button, Provider, Toast, Icon, Flex, ListView, List } from '@ant-design/react-native';

import { RecordAPI } from '@api';

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
                console.log("rowData", rowData)
                let rowData = JSON.parse(args);
                startFetch(rowData, pageLimit);
              });            
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
        }
    };

    renderItem = (item) => {
        return (
            <Item key={item.id} style={{ padding: 10 }}>
                <Text>{item.maxNum}</Text>
            </Item>
        );
    };


    render() {
        return (
            <Provider>
                <Item style={{ padding: 10 }}>
                    <Flex justify="between" >
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}>创建日期</Text>
                        </Flex.Item>
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}>运算逻辑</Text>
                        </Flex.Item>
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}>题量</Text>
                        </Flex.Item>
                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}>完成情况</Text>
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