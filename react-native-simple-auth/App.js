/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Routes from "./Routes";
import colors from './src/assets/theme/colors'

export default class Root extends React.Component {
    render() {
        console.disableYellowBox = true;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={colors.primary}
                />
                <Routes />
            </View>
        )
    }
}


