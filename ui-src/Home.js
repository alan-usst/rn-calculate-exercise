import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Button, Provider, Toast, Icon, SearchBar, TabBar } from '@ant-design/react-native';

import QuickStart from './qs/QuickStart';
import QuickStartDetail from './qs/QuickStartDetail';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'quickStartTab',
      tabBarVisiable: true
    };
  }
  renderContent(pageText) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    );
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  // 展示tabBar
  showTabBar = () => {
    this.setState({ tabBarVisiable: true });
  }

  // 隐藏tabBar
  hideTabBar = () => {
    console.log("hide origin");
    this.setState({ tabBarVisiable: false });
  }

  render() {
    return (
      <Provider>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#f5f5f5"
        >
          <TabBar.Item
            title="快速开始"
            icon={<Icon name="edit" />}
            selected={this.state.selectedTab === 'quickStartTab'}
            onPress={() => this.onChangeTab('quickStartTab')}
          >
            <QuickStart showTabBar={this.showTabBar} hideTabBar={this.hideTabBar}></QuickStart>
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon name="table" />}
            title="练习记录"
            selected={this.state.selectedTab === 'exerciseRecordTab'}
            onPress={() => this.onChangeTab('exerciseRecordTab')}
          >
            {this.renderContent('exerciseRecord Tab')}
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon name="area-chart" />}
            title="练习统计"
            selected={this.state.selectedTab === 'exerciseStatisticsTab'}
            onPress={() => this.onChangeTab('exerciseStatisticsTab')}
          >
            {this.renderContent('exerciseStatistics Tab')}
          </TabBar.Item>
        </TabBar>
      </Provider>
    );
  }
}