import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Button, Provider, Toast, Icon, SearchBar, Badge, TabBar } from '@ant-design/react-native';

import QuickStart from './qs/QuickStart';
import RecordList from './RecordList';
import RecordStatistics from './RecordStatistics';
import {Info} from './index';
import { RecordAPI } from '@api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'quickStartTab',
      tabBarVisiable: true,
      unCompleteCount: 0
    };
  }

  setUnCompleteCountState = (count) => {
    this.setState({ unCompleteCount: count })
  }

  refreshUnCompleteCount = () => {
    const { setUnCompleteCountState } = this;
    RecordAPI.getUnCompleteRecordCount(function (args) {
      setUnCompleteCountState(args);
    });

  }

  componentDidMount = () => {
    this.refreshUnCompleteCount();
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

  render() {
    const { unCompleteCount } = this.state;
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
            <QuickStart navigation={this.props.navigation} />
          </TabBar.Item>
          <TabBar.Item
            badge={unCompleteCount>10?"10+":unCompleteCount}
            icon={<Icon name="table" />}
            title="练习记录"
            selected={this.state.selectedTab === 'recordListTab'}
            onPress={() => this.onChangeTab('recordListTab')}
          >
            <RecordList navigation={this.props.navigation} />
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon name="area-chart" />}
            title="练习统计"
            selected={this.state.selectedTab === 'exerciseStatisticsTab'}
            onPress={() => this.onChangeTab('exerciseStatisticsTab')}
          >
            <RecordStatistics />
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon name="notification" />}
            title="注意事项"
            selected={this.state.selectedTab === 'infoTab'}
            onPress={() => this.onChangeTab('infoTab')}
          >
            <Info/>
          </TabBar.Item>
        </TabBar>
      </Provider>
    );
  }
}