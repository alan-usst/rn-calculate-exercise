import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Button, Provider, Toast, Icon, SearchBar, ListView } from '@ant-design/react-native';

export default class RecordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: 'list',
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
            let pageLimit = 30;
            if (this.state.layout === 'grid') pageLimit = 60;
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
            <View style={{ padding: 10 }}>
                <Text>{item}</Text>
            </View>
        );
    };

    render() {
        return (
            <Provider>
                <ListView
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) =>
                        `${this.state.layout} - ${item} - ${index}`
                    }
                    renderItem={this.renderItem}
                    numColumns={this.state.layout === 'list' ? 1 : 3}
                />
            </Provider>
        );
    }
}