/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Routes from "./Routes";
import colors from './src/assets/theme/colors'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';

export default class Root extends React.Component {
    render() {
        console.disableYellowBox = true;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={colors.primary}
                />
                <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                    <Routes />
                </Provider>

            </View>
        )
    }
}


