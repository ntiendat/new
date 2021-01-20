import React, {Component} from 'react';
// import { StatusBar } from "expo-status-bar";
import axios from 'axios';

import {IP} from '../env';
import {Container, Header, Tab, Tabs, ScrollableTab} from 'native-base';
import TheGioi from './category/TheGioi';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  List,
  StatusBar,
} from 'react-native';
export default class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bai_viet: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://' + IP + '/api/public/api/baiviet',
      data: null,
    })
      .then((res) => {
        this.setState({bai_viet: res.data});
        //  console.log(this.state.bai_viet);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        {/* <Header hasTabs/> */}
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Trang nhất">
            <TheGioi prop={this.props.prop} />
          </Tab>
          <Tab heading="Mới nhất">
            <TheGioi prop={this.props.prop} />
          </Tab>
          <Tab heading="Thời sự">
            <TheGioi prop={this.props.prop} />
          </Tab>
          <Tab heading="Góc nhìn">
            <TheGioi prop={this.props.prop} />
          </Tab>
          <Tab heading="Thế Giới">
            <TheGioi prop={this.props.prop} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  catrgoryImage: {
    width: '100%',
    height: 200,
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    width: '100%',
    height: 'auto',
    borderRadius: 4,
    shadowOpacity: 10,
    shadowOffset: {width: 0, height: 0},
    marginBottom: 20,
  },
});
