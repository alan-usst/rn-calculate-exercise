import React from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Accordion, List, WingBlank } from '@ant-design/react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

const CONTENT_QA = [
  {
    title: '题目数量不对',
    content:
      <Text>
        <Text>问：我选择了20道题，为什么最后只生成了15道？</Text>{"\n"}
        <Text>答：选择好题量后，题目是随机生成的，会去掉一些重复的题，且由于一些限制因素也会去掉一些题，所以最终总数量会相应减少。限制因素：1.减法题必须保证计算结果为非负数（目前不开放负数相关的计算）；2.除法题需要保证被除数能被整除（结果不能是小数）</Text>
      </Text>
  }
]

const CONTENT_OTHER = [

  {
    title: '兼容性问题',
    content:
      <Text>该应用最低需要Android 10系统，目前只在Huawei Mate 40Pro 上做过真机测试和分辨率适配。其他机型如有问题，请通过建议意见栏的联系方式做反馈</Text>
  },
  {
    title: '版权问题',
    content:
      <Text>欢迎转发推荐该应用，但请勿用作商业用途。版权归属：chenlin.usst@gmail.com</Text>
  },
  {
    title: '建议意见',
    content:
      <Text>第一次写RN，肯定存在诸多问题。如有任何建议和意见请通过以下方式联系反馈，邮件：chenlin.usst@gmail.com 或微信：abc444873863</Text>
  },
  {
    title: '招贤纳士',
    content: <Text>本人UI交互造诣极低，如果有UI大佬能给一份该应用的新UI设计稿，在下感激不尽</Text>,
  },
  {
    title: '感谢',
    content: <Text>感谢三之三幼儿园的费老师等人，给了我做该小应用的启发</Text>,
  }
];

export default class info extends React.Component {
  state = {
    activeSectionsQa: [],
    activeSectionsOther: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSectionsQA = (sections) => {
    this.setState({
      activeSectionsQa: sections.includes(undefined) ? [] : sections,
    });
  };

  setSectionsQther = (sections) => {
    this.setState({
      activeSectionsOther: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSectionsQa, activeSectionsOther } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Text style={styles.title}>答 疑 解 惑</Text>
          <Accordion
            activeSections={activeSectionsQa}
            sections={CONTENT_QA}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSectionsQA}
            renderAsFlatList={false}
          />
          <View style={{paddingTop:40}} />
          <Text style={styles.title}>其他</Text>
          <Accordion
            activeSections={activeSectionsOther}
            sections={CONTENT_OTHER}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSectionsQther}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});