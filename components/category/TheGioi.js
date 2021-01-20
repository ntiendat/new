import React, {Component} from 'react';
// import { StatusBar } from "expo-status-bar";
import axios from 'axios';

import {IP} from '../../env';
import {Container, Header, Tab, Tabs, ScrollableTab} from 'native-base';

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
export default class TheGioi extends React.Component {
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
      <View>
        <FlatList
          data={this.state.bai_viet}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.prop.navigation.navigate('Content', {id: item.id})
              }>
              <View style={({flex: 1}, styles.container)}>
                <StatusBar style="auto" />

                <Text style={styles.title}>{item.tieu_de}</Text>
                <Image
                  style={styles.catrgoryImage}
                  source={{uri: item.anh !== '' ? item.anh : undefined}}
                />
                <Text>{item.noi_dung.slice(0, 150) + '...'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
