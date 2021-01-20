// import { StatusBar } from "expo-status-bar";
import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  StatusBar,
} from 'react-native';
// import { Container, Header, Content, Icon } from 'native-base';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  _get = async () => {
    try {
      const value = await AsyncStorage.getItem('@USER:key');

      const user = JSON.parse(value);
      // console.log("Đây là value " + u.username);
      // this.setState({user : ...u })

      return this.setState({user});
      // console.log("đây là state "+this.state.user.username);
    } catch (e) {
      console.log('lỗii' + e);
    }
  };

  componentDidMount = async () => {
    await this._get();
    console.log(this.state.user);
  };
  render() {
    let {user} = this.state;
    let username = user != null ? user.username : '';
    return (
      <View style={styles.container}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
            height: 70,
            backgroundColor: 'orange',
            fontSize: 30,
            textAlign: 'center',
          }}>
          {username}
        </Text>
        <View style={styles.mg_flx}>
          <Text
            style={{
              flex: 1,
              textAlign: 'left',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Tài khoản
          </Text>
          <TouchableOpacity style={{flex: 1}}>
            <Text style={{fontSize: 18, color: 'orange', textAlign: 'right'}}>
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="email"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <Text style={styles.txt}>Hiển thị email</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="phoneNumber"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <Text style={styles.txt}>Hiển thị Sđt</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="eye"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <Text style={styles.txt}>**********</Text>
        </View>

        <View style={styles.mg_flx}>
          <Text
            style={{
              flex: 1,
              textAlign: 'left',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Thông tin cá nhân
          </Text>
          <TouchableOpacity style={{flex: 1}}>
            <Text style={{textAlign: 'right', fontSize: 18, color: 'orange'}}>
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="user"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <Text style={styles.txt}>Hiển thị Họ và tên</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="gender"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <Text style={styles.txt}>Hiển thị giới tính</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="house"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <Text style={styles.txt}>
            số 4, ngõ 175/5 Định Công Hoàng Mai Hà Nội
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* <Icon
                  name="logout"
                  type="FontAwesome5"
                  // solid={this.state.like}
                  style={{ fontSize: 20, color: "orange", marginRight: 20 }}
                /> */}
          <TouchableOpacity
            onPress={ async () =>
              // console.log(this.props.prop)
              await AsyncStorage.removeItem('@USER:key'),
              this.props.prop.navigation.navigate('Login')
            }>
            <Text style={{fontSize: 20, color: 'orange'}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <StatusBar></StatusBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mg_flx: {
    flexDirection: 'row',
    marginTop: 30,
    margin: 10,
  },
  txt: {
    padding: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
