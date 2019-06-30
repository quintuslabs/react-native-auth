/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, StatusBar } from 'react-native';

import Logo from './../components/Logo';
import { AsyncStorage } from "react-native";

export default class WelcomeScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                4000
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage


        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this._loadInitialState().done();

        }


    }
    _loadInitialState = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
            this.props.navigation.navigate('Home');
        } else {
            this.props.navigation.navigate('Login');
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                <View>
                    <Logo />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
