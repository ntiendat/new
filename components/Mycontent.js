import React from 'react';
// import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  AsyncStorage,
  FlatList,
  StatusBar,
} from 'react-native';
import {IP} from '../env';

export default class MyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bai_viet: [],
      user: null,
      a: {name: 'đạt'},
    };
  }

  // importData = async () => {
  //   try {
  //     // const keys = await AsyncStorage.getAllKeys();
  //     const result = await AsyncStorage.multiGet(keys);

  //     return result.map(req => JSON.parse(req)).forEach(console.log);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // _retrieveData = async (name) => {
  //   try {
  //     // console.log("get data");
  //     const value = await AsyncStorage.getItem(name);
  //     // alert("app"+value);
  //     if (value !== null) {
  //       // We have data!!
  //       // console.log(JSON.parse(value));
  //       // console.log("jgjkb"+value);
  //       // console.log("Có giá trị");
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log("ko có giá trị");
  //     return false;
  //   }

  // };
  _get = async () => {
    try {
      const value = await AsyncStorage.getItem('@USER:key');

      const u = JSON.parse(value);
      console.log('Đây là value ' + u.username);
      // this.setState({user : ...u })

      return this.setState({user: u});
      // console.log("đây là state "+this.state.user.username);
    } catch (e) {
      console.log('lỗi' + e);
    }
  };
  componentDidMount() {
    // this._retrieveData();
    this._get().then(
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
        }),
    );
  }

  render() {
    let {user} = this.state;
    let username = user != null ? user.username : '';

    return (
      <View>
        <ScrollView>
          <Text style={{fontSize: 20, paddingTop: 20, paddingLeft: 20}}>
            Hell0 {username},
          </Text>
          <Text style={{fontSize: 20, paddingLeft: 20, paddingBottom: 20}}>
            Tin bạn chưa xem
          </Text>
          <FlatList
            data={this.state.bai_viet}
            renderItem={({item}) => (
              <TouchableOpacity
                keyExtractor={item.id}
                onPress={() =>
                  this.props.prop.navigation.navigate('Content', {id: item.id})
                }
                style={{flex: 1, padding: 0}}>
                <StatusBar style="auto" />

                <View style={({flex: 1, padding: 0}, styles.container)}>
                  <View style={{flex: 1, flexDirection: 'row', height: 70}}>
                    <Text style={(styles.title, {flex: 3})}>
                      {item.tieu_de}
                    </Text>
                    <Image
                      style={(styles.catrgoryImage, {flex: 1})}
                      source={{uri: item.anh}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}></FlatList>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  catrgoryImage: {
    width: '100%',
    height: 'auto',
    padding: 0,
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
