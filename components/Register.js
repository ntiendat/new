import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
// import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import {IP} from './../env';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
    };
  }
  onChangeTK = (username) => {
    this.setState({username});
  };
  onChangeMK = (pass) => {
    this.setState({pass});
  };
  register = () => {
    axios({
      method: 'POST',
      url: 'http://' + IP + '/api/public/api/register',
      data: {
        username: this.state.username,
        pass: this.state.pass,
      },
    })
      .then(() => {
        console.log('thành công'), console.log(this.props.prop);
        this.props.prop.navigation.navigate('Home');
      })
      .catch((err) => {
        console.log('thất bại');
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. nnh@gmail.com"
          onChangeText={this.onChangeTK}
          value={this.state.username}></TextInput>

        <Text style={styles.txt}>Mật khẩu</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="********"
          onChangeText={this.onChangeMK}
          value={this.state.pass}></TextInput>
        <Text style={styles.txt}>Xác nhận mật khẩu</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="********"></TextInput>
        <TouchableOpacity onPress={this.register}>
          <Text style={styles.ButtonStyle}>Đăng ký</Text>
        </TouchableOpacity>

        <StatusBar></StatusBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#00400030',
    padding: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  txt: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginLeft: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    margin: 10,
    width: 300,
  },
  ButtonStyle: {
    borderWidth: 0.5,
    backgroundColor: 'orange',
    padding: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    margin: 20,
    width: 300,
  },
});
export default Register;
