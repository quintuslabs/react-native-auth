/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    StatusBar,
    ActivityIndicator,
    FlatList,
    Alert,
} from 'react-native';

import Logo from '../components/SmallLogo';
import Wallpaper from '../components/Wallpaper';
import Snackbar from 'react-native-snackbar';
export default class ProfileScreen extends Component {

    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#283f78',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontWeight: 'bold',
        },
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };
    //handling onPress action  
    getListViewItem = (item) => {
        Alert.alert(item.key);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#283f78" barStyle="light-content" />
                <FlatList
                    data={[
                        { key: 'Android' }, { key: 'iOS' }, { key: 'Java' }, { key: 'Swift' },
                        { key: 'Php' }, { key: 'Hadoop' }, { key: 'Sap' },
                        { key: 'Python' }, { key: 'Ajax' }, { key: 'C++' },
                        { key: 'Ruby' }, { key: 'Rails' }, { key: '.Net' },
                        { key: 'Perl' }, { key: 'Sap' }, { key: 'Python' },
                        { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                        { key: 'Rails' }, { key: '.Net' }, { key: 'Perl' }
                    ]}
                    renderItem={({ item }) =>
                        <Text style={styles.item}
                            onPress={this.getListViewItem.bind(this, item)}>{item.key}</Text>}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
