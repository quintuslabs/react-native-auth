/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    StatusBar,
    TouchableOpacity,
    alert,
    Button,
    Image,
    AsyncStorage
} from "react-native";
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import { fetchUserList } from '../actions';
import { connect } from 'react-redux';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "User List",
            headerStyle: { backgroundColor: "#4E3AD9" },
            headerTitleStyle: { color: "white", textAlign: "center", flex: 1 },
            headerRight: (
                <TouchableOpacity
                    onPress={() => AsyncStorage.removeItem('user').then(() => navigation.navigate("Login"))}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('./../assets/images/logout.png')} />
                </TouchableOpacity>

            ),

        };
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            console.log(result);
        });
        this.props.fetchUserList();
    }


    FlatListItemSeparator = () => {
        return (
            <View style={{ height: .5, width: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}
            />
        );
    }
    renderItem = (data) =>
        <TouchableOpacity style={styles.list}
            onPress={() => this.actionOnRow(data.item)}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Image style={{ width: 50, height: 50, marginRight: 10 }} source={{ uri: data.item.image }} />
                <View>
                    <Text style={styles.lightText}>{data.item.name}</Text>
                    <Text style={styles.lightText}>{data.item.email}</Text>
                    <Text style={styles.lightText}>{data.item.mobile}</Text>
                </View>

            </View>
        </TouchableOpacity>

    actionOnRow(item) {
        console.log('Selected Item :', item);
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.props.users}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    }
});


const mapStateToProps = state => {
    return {
        error: state.userList.error,
        loading: state.userList.loading,
        users: state.userList.users,
    }
}

export default connect(mapStateToProps, { fetchUserList })(HomeScreen);