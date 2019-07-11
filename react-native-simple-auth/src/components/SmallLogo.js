/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logoImage}
                    source={require('./../assets/images/logo.png')}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage: {
        width: 100,
        height: 100,
    },

});