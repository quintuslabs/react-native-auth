/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import React, { Component } from 'react';
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
    ScrollView,
    Dimensions,
} from 'react-native';

import Logo from './../components/SmallLogo';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './../assets/theme/styles';
import { connect } from 'react-redux';
import { loginUser } from '../actions'
const { height } = Dimensions.get('window');

class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            screenHeight: 0,
            userEmail: '',
            userPassword: ''
        }
    }


    async componentWillReceiveProps(nextProps) {
        console.log("Reciving Props.....");
        console.log(nextProps.user);
        await AsyncStorage.setItem('user', JSON.stringify(nextProps.user))
            .then(() => {
                console.log('It was saved successfully')
            })
            .catch(() => {
                console.log('There was an error saving the product')
            })
        if (nextProps.user != null) {
            Snackbar.show({
                title: 'Login Successfull !!',
                duration: Snackbar.LENGTH_SHORT,
            });

            this.props.navigation.navigate("Home");
        } else if (nextProps.user === null) {
            Snackbar.show({
                title: nextProps.error,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight });
    };
    login = () => {

        Keyboard.dismiss();
        const { userEmail, userPassword } = this.state;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (userEmail == "") {
            Snackbar.show({
                title: 'Please enter Email/Mobile',
                duration: Snackbar.LENGTH_SHORT,
            });

        }

        else if (userPassword == "") {

            Snackbar.show({
                title: 'Please enter Password',
                duration: Snackbar.LENGTH_SHORT,
            });

        }
        else if (userPassword.length < 6) {

            Snackbar.show({
                title: 'Please enter 6 charactor Password',
                duration: Snackbar.LENGTH_SHORT,
            });

        }

        else {

            this.props.loginUser({ userEmail, userPassword });
        }
    }

    _renderButton() {

        if (this.props.loading) {
            return <ActivityIndicator size="large" color="#ff3d00" animating={this.props.loading} />;
        } else {
            return (<TouchableOpacity
                onPress={this.login}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </View>
            </TouchableOpacity>);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <View style={styles.loginContainer}>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}>

                    <View style={styles.loginArea}>
                        <View style={{ height: 30 }} />
                        <Logo />

                        <View style={{ height: 30 }} />
                        <View style={styles.emailContainer}>
                            <TextInput style={styles.textInput} placeholder="Email/mobile"
                                onChangeText={userEmail => this.setState({ userEmail })}
                                keyboardType="email-address"
                                autoCapitalize='none' />

                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput style={styles.textInput} placeholder="Password"
                                onChangeText={userPassword => this.setState({ userPassword })}
                                secureTextEntry={true} />
                        </View>
                        {this._renderButton()}

                    </View>
                    <View style={styles.newAccountContainer}>
                        <View style={styles.normalContainer}>
                            <Text style={styles.normalText}>Do not have account?</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigate('Register')}>
                            <View style={styles.createAccount}>
                                <Text style={styles.createText}>Create new account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View >
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, { loginUser })(LoginScreen);