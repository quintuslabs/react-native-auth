/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

import React, { Component } from "react";
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './src/pages/WelcomeScreen';
import LoginScreen from './src/pages/LoginScreen.js';
import RegisterScreen from './src/pages/RegisterScreen';
import HomeScreen from './src/pages/HomeScreen.js';
import ProfileScreen from './src/pages/ProfileScreen';

const FirstNavigator = createStackNavigator({
    First: {
        screen: WelcomeScreen,
    },
});


const LoginNavigator = createStackNavigator({

    Login: {
        screen: LoginScreen,
    },

    Register: {
        screen: RegisterScreen,
    },
});
const HomeNavigator = createStackNavigator({

    Home: {
        screen: HomeScreen,
    },

    Profile: {
        screen: ProfileScreen,
    },
});



export const MainNavigator = createSwitchNavigator({
    Welcome: {
        screen: FirstNavigator,
    },
    Login: {
        screen: LoginNavigator,
    },
    Home: {
        screen: HomeNavigator,
    },

});


export default createAppContainer(MainNavigator);