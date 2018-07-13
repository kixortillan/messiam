import React from 'react';
import { Provider, connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { createStackNavigator, createSwitchNavigator, 
  createBottomTabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from './lib/firebase';
import store from './store/store';

//import Auth from './views/Auth';
import Login from './views/Login';
import Home from './views/Home';
import ChatList from './views/ChatList';
import Group from './views/Group';
import Account from './views/Account';
import AuthLoading from './views/AuthLoading';

const AppStack = createBottomTabNavigator({
  Home, ChatList, Group, Account
}, {
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      switch(routeName) {
        case 'ChatList':
          return <MaterialIcons name="chat" size={24} />;
        case 'Account':
          return <MaterialIcons name="account-circle" size={24} />;
        case 'Group':
          return <MaterialIcons name="group" size={24} />;
        default:
        case 'Home':
          return <MaterialIcons name="home" size={24} />;
      }
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel: false,
    style: {
      backgroundColor: '#FFF',
    }
  },
});

const AuthStack = createStackNavigator({
  Login
}, {
  initialRouteName: 'Login',
});

const RootStack = createSwitchNavigator({
  AppStack, AuthStack, AuthLoading
}, {
  initialRouteName: 'AuthLoading',
})

export default class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.cacheAssets = this.cacheAssets.bind(this);
    this.appIsReady = this.appIsReady.bind(this);
  }

  cacheAssets() {
    const images = [
      require('./abizo-splash.png'),
      require('./abizo.png'),
    ];
    const cache = images.map((img) => {

      return Asset.fromModule(img).downloadAsync();
    });

    return Promise.all(cache);
  }

  appIsReady() {
    store.dispatch({type: 'UPDATE_APP_READY', data: { isAppReady: true }});
  }

  componentDidMount() {
    
  }

  render() {
    if(this.state.isAppReady === false) {
      console.log('App Loading...');
      return (
        <AppLoading startAsync={this.cacheAssets} onFinish={this.appIsReady}
          onError={(err) => console.error(err)} />
      );
    }

    return (
      <Provider store={ store }>
        <RootStack style={{ flex: 1 }} />
      </Provider>
    );
  }
}