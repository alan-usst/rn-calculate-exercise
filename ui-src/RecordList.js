import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Button, Provider, Toast, Icon, Flex, ListView, List } from '@ant-design/react-native';

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
            const skip = (page - 1) * pageLimit;
            //Generate dummy data
            let rowData = Array.from(
                { length: pageLimit },
                (_, index) => `item -> ${index + skip}`
            );

            //Simulate the end of the list if there is no more data returned from the server
            if (page === 3) {
                rowData = [];
            }

            //Simulate the network loading in ES7 syntax (async/await)
            await this.sleep(2000);
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
        }
    };

    renderItem = (item) => {
        return (
            <Item style={{ padding: 10 }}>
                <Text>{item}</Text>
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