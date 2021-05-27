import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import { WingBlank, Flex} from '@ant-design/react-native';

import { StatisticsAPI } from '@api';

const screenWidth = Dimensions.get('window').width - 30;

var screenHeight = Dimensions.get('window').height - 72;


export default class RecordStatistics extends React.Component {
  constructor() {
    super(...arguments);
    this.state={
      totalRightCount:100,
      totalWrongCount: 50,
      dayTimes:[],
      dayData:[]
    }
  }
  data = () => ({
    labels: this.state.dayTimes,
    legend: ["答对次数", "答错次数"],
    data: this.state.dayData,
    barColors: [colorConfig.right, colorConfig.wrong]
  })
  pieChartData=() => [
    { name: '答对 ' + this.state.totalRightCount + ' 次', count: this.state.totalRightCount, color: colorConfig.right, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '答错 ' + this.state.totalWrongCount + ' 次', count: this.state.totalWrongCount, color: colorConfig.wrong, legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]

  refreshState = (info)=>{
    console.log("info", info)
    let dayTimes = info.days.map(ele => {
      return ele.submitTime;
    });
    let dayData = info.days.map(ele=>{
      return [ele.rightCountm, ele.wrongCount];
    })
    this.setState({totalRightCount:info.totalRightCount,totalWrongCount:info.totalWrongCount, dayTimes:dayTimes, dayData:dayData});
  }

  componentDidMount = () => {
    const {refreshState} = this;
    StatisticsAPI.getOverviewList(7, function (res) {
      res = JSON.parse(res);
      refreshState(res);
  });
  }
  render() {
    return (
      <ScrollView style style={styles.container}>
        <WingBlank>
          <Flex direction="column" justify='start'>
            <Flex.Item>
              <Text style={styles.title}>最近答题统计</Text>
              <StackedBarChart
                style={chartConfig.style}
                data={this.data()}
                width={screenWidth}
                height={screenHeight/2 - 100}
                chartConfig={chartConfig}
              />
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.title}>累计答题统计</Text>
              <PieChart
                data={this.pieChartData()}
                height={screenHeight/2 - 150}
                width={screenWidth}
                chartConfig={chartConfig}
                accessor="count"
                style={chartConfig.style}
                backgroundColor={"transparent"}
                paddingLeft="10"
                hasLegend
                avoidFalseZero={true}
              />
            </Flex.Item>
          </Flex>
        </WingBlank>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#292a2b',
    height: screenHeight,
  },
  title: {
    marginTop: 40,
    marginBottom:10,
    color: '#d1974b',
    fontSize: 19,
    fontWeight: "bold",
    textAlign: 'center',
  }
});

const chartConfig = {
  backgroundGradientFrom: "#939389",
  backgroundGradientTo: "#e1a34f",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.7,
  barRadius: 3,
  useShadowColorFromDataset: false, // optional
  style: {
    borderRadius: 13,
    marginVertical: 8,
  }
};

const colorConfig = {
  right: "#2fce7c",
  wrong: "#ee2c48"
}