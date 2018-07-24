import React from 'react';
import { Provider } from 'react-redux';
import { Asset, AppLoading } from 'expo';
import { createStackNavigator, createSwitchNavigator, 
  createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import firebase from './lib/firebase';
import store from './store/store';

import Login from './views/Login';
import Home from './views/Home';
import ChatList from './views/ChatList';
import Group from './views/Group';
import GroupDetails from './views/GroupDetails';
import CreateGroup from './views/CreateGroup';
import Account from './views/Account';
import AuthLoading from './views/AuthLoading';

const GroupStack = createStackNavigator({
  Group, GroupDetails, CreateGroup
}, {
  initialRouteName: 'Group',
  headerMode: 'float',
});

const AppStack = createBottomTabNavigator({
  Home, ChatList, GroupStack, Account
}, {
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      switch(routeName) {
        case 'ChatList':
          return <Ionicons name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'} size={32} />;
        case 'Account':
          return <Ionicons name={focused ? 'ios-contact' : 'ios-contact-outline'} size={32} />;
        case 'GroupStack':
          return <Ionicons name={focused ? 'ios-contacts' : 'ios-contacts-outline'} size={32} />;
        default:
        case 'Home':
          return <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={32} />;
      }
    }
  }),
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#FFF'
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