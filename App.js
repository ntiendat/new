// import { StatusBar } from "expo-status-bar";
import React from "react";
import Categorys from "./components/CategoryListItem";
import Register from "./components/Register";
import Cont from "./components/Content";
import In from "./components/Info";
import MyCont from "./components/Mycontent";
import { IP } from "./env";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
_retrieveData = async (name, obj) => {
  try {
    // console.log("get data");
    const value = await AsyncStorage.getItem(name);
    // alert("app"+value);
    if (value !== null) {
      // We have data!!
      // console.log(JSON.parse(value));
      console.log(value);
      return JSON.parse(value);
      // console.log("Có giá trị");
    }
  } catch (error) {
    // Error retrieving data
    console.log("ko có giá trị");
    return false;
  }
};
_storeData = async (obj) => {
  try {
    await AsyncStorage.setItem("@USER:key", JSON.stringify(obj));
    console.log("set");
  } catch (error) {
    // Error saving data
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: "",
      pass: "",
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://" + IP + "/api/public/api/user",
      data: null,
    })
      .then((res) => {
        this.setState({ users: res.data });
        // , console.log(this.state.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  login = () => {
    this.state.users.map((obj) => {
      if (
        obj.username === this.state.username &&
        obj.pass === this.state.pass
      ) {
        console.log("đăng nhập nhành công");
        _storeData(obj);
        //  console.log(_retrieveData('user'));
        _retrieveData("@USER:key");

        this.props.navigation.replace("Home");
      } else {
        console.log("đăng nhập thất bại");
      }
    });
  };
  onChangeTK = (username) => {
    this.setState({ username });
  };
  onChangeMK = (pass) => {
    this.setState({ pass });
  };
  register = () => {
    this.props.navigation.navigate("Registers");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. nnh@gmail.com"
          onChangeText={this.onChangeTK}
          value={this.state.username}
        ></TextInput>

        <Text style={styles.txt}>Mật khẩu</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="********"
          onChangeText={this.onChangeMK}
          value={this.state.pass}
        ></TextInput>
        <TouchableOpacity onPress={this.login}>
          <Text style={styles.ButtonStyle}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.flx}>
          <TouchableOpacity onPress={this.register} style={{ flex: 1 }}>
            <Text style={{ textAlign: "left" }}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={{ textAlign: "right" }}>Lấy lại mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <StatusBar></StatusBar>
      </View>
    );
  }
}

class Home extends React.Component {
  render() {
    // console.log(this.props.route.params.tk);
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "MyContent") {
              iconName = focused ? "ios-list-box" : "ios-list";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Ct}
          options={{ title: "VNEXPRESS" }}
        />
        <Tab.Screen
          name="MyContent"
          component={MyContent}
          options={{ title: "Tin của bạn" }}
        />
        <Tab.Screen
          name="Profile"
          component={Info}
          options={{ title: "Info" }}
        />
      </Tab.Navigator>
    );
  }
}
class Info extends React.Component {
  render() {
    // return <In/>;
    return <In prop={this.props} />;
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
    };
  }

  render() {
    return <Cont id={this.state.id} />;
  }
}

class Registers extends React.Component {
  render() {
    return <Register prop={this.props} />;
  }
}

class Ct extends React.Component {
  render() {
    return <Categorys prop={this.props} />;
  }
}
class MyContent extends React.Component {
  render() {
    return <MyCont prop={this.props} />;
  }
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "VNXpress", headerLeft: null }}
        />
        <Stack.Screen
          name="Registers"
          component={Registers}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#00400030",
    padding: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
  txt: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginLeft: 35,
  },
  flx: {
    flexDirection: "row",
    width: "80%",
    height: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    margin: 10,
    width: 300,
  },
  ButtonStyle: {
    borderWidth: 0.5,
    backgroundColor: "orange",
    padding: 10,
    fontSize: 18,
    color: "white",
    textAlign: "center",
    margin: 20,
    width: 300,
  },
});
