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
  StatusBar,
} from 'react-native';
import {Icon} from 'native-base';
import {IP} from '../env';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bai_viet: [],
      like: null,
      save: null,
      content: null,
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
    await this._get().then(
      axios({
        method: 'GET',
        url: 'http://' + IP + '/api/public/api/baiviet',
        data: null,
      }).then((res) => {
        const arr_result = res.data.filter((item) => item.id == this.props.id);
        const result = arr_result[0];
        this.setState({content: result}, async () => {
          await axios({
            method: 'POST',
            url: 'http://' + IP + '/api/public/api/checklike',
            data: {
              id_user: this.state.user.id,
              id_bai_viet: this.state.content.id,
            },
          })
            .then((res) => {
              if (res.data === '0') {
                this.setState({like: false});
              } else {
                this.setState({like: true});
              }
            })
            .then(
              await axios({
                method: 'POST',
                url: 'http://' + IP + '/api/public/api/checksave',
                data: {
                  id_user: this.state.user.id,
                  id_bai_viet: this.state.content.id,
                },
              }).then((res) => {
                if (res.data === '0') {
                  this.setState({save: false});
                } else {
                  this.setState({save: true});
                }
              }),
            );
        });
      }),
    );

    //alert(this.state.content == null);
  };

  toggerLike = async () => {
    if (this.state.like === false) {
      await axios({
        method: 'POST',
        url: 'http://' + IP + '/api/public/api/like',
        data: {
          id_user: this.state.user.id,
          id_bai_viet: this.state.content.id,
        },
      });
    } else {
      await axios({
        method: 'POST',
        url: 'http://' + IP + '/api/public/api/dislike',
        data: {
          id_user: this.state.user.id,
          id_bai_viet: this.state.content.id,
        },
      });
    }
    this.setState({like: !this.state.like});
  };

  toggerSave = async () => {
    console.log(this.state.user.id);
    console.log(this.state.content.id);

    if (this.state.save === false) {
      await axios({
        method: 'POST',
        url: 'http://' + IP + '/api/public/api/save',
        data: {
          id_user: this.state.user.id,
          id_bai_viet: this.state.content.id,
        },
      });
    } else {
      await axios({
        method: 'POST',
        url: 'http://' + IP + '/api/public/api/dissave',
        data: {
          id_user: this.state.user.id,
          id_bai_viet: this.state.content.id,
        },
      });
    }
    this.setState({save: !this.state.save});
  };
  render() {
    let {content} = this.state;
    let tieu_de = content != null ? content.tieu_de : '';
    let anh = content != null ? content.anh : '';
    let noi_dung = content != null ? content.noi_dung : '';
    return (
      <ScrollView>
        {/* {this.state.bai_viet.map((obj) => {
          if (obj.id == this.props.id) {
            console.log(obj.id);
            return ( */}
        <View
          style={({flex: 1}, styles.container)}
          // key={obj.id.toString()}
        >
          <StatusBar style="auto" />
          <Text style={styles.title}>{tieu_de}</Text>
          <Image
            style={styles.catrgoryImage}
            source={{uri: anh !== '' ? anh : undefined}}
          />
          <Text>{noi_dung}</Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.toggerLike();
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Icon
                  name="thumbs-up"
                  type="FontAwesome5"
                  solid={this.state.like}
                  style={{fontSize: 20, color: 'red', marginRight: 20}}
                />
                <Text>Like</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.toggerSave();
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Icon
                  name="bookmark"
                  type="FontAwesome5"
                  // solid={true}
                  solid={this.state.save}
                  style={{fontSize: 20, color: 'red', marginRight: 20}}
                />
                <Text>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* );
          } else {
            return true;
          }
        })} */}
      </ScrollView>
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
