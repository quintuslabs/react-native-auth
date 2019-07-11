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
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './../assets/theme/styles'
const { height } = Dimensions.get('window');

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            screenHeight: 0,
            showButton: true,
            isLoading: false,
            userEmail: '',
            userPassword: ''
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
            //alert("Please enter Email address");
            //this.setState({ email: 'Please enter Email address' })
            Snackbar.show({
                title: 'Please enter Email/Mobile',
                duration: Snackbar.LENGTH_SHORT,
            });

        }

        // else if (reg.test(userEmail) === false) {
        //     Snackbar.show({
        //         title: 'Please enter correct Email address',
        //         duration: Snackbar.LENGTH_SHORT,
        //     });
        //     return false;
        // }

        else if (userPassword == "") {
            //this.setState({ password: 'Please enter password' })
            Snackbar.show({
                title: 'Please enter Password',
                duration: Snackbar.LENGTH_SHORT,
            });

        }
        else if (userPassword.length < 6) {
            //this.setState({ password: 'Please enter password' })
            Snackbar.show({
                title: 'Please enter 6 charactor Password',
                duration: Snackbar.LENGTH_SHORT,
            });

        }
        // else if (strongRegex.test(userPassword) === false) {

        //     Snackbar.show({
        //         title: 'password should contain atleast one number and one special character',
        //         duration: 4000,
        //     });

        // }
        else {

            if (this.state.showButton == true) {
                this.setState({ showButton: false });
                this.setState({ isLoading: true });
            }

            axios.post("https://dummyapi.000webhostapp.com/api/login.php", {
                email: userEmail,
                password: userPassword
            }).then(response => {
                console.log(response.status)
                console.log(response.data.user);
                if (response.status === 200 && response.data !== null) {
                    Snackbar.show({
                        title: 'Login Successfull !!',
                        duration: 4000
                    });
                    console.log("user details" + JSON.stringify(response.data.user));
                    AsyncStorage.setItem('user', JSON.stringify(response.data.user + ""))
                    this.props.navigation.navigate("Home");
                } else {
                    Snackbar.show({
                        title: 'Please check Email and password',
                        duration: 4000
                    });
                    if (this.state.showButton == false) {
                        this.setState({ showButton: true });
                        this.setState({ isLoading: false });
                    }
                }

            }).catch(error => {
                console.log("" + error);
                let errorString = "" + error;
                const code = errorString.substring(errorString.length - 3, errorString.length);
                console.log(code);
                if (code == 404) {
                    Snackbar.show({
                        title: "Please enter correct information",
                        duration: 4000
                    });

                }
                if (this.state.showButton == false) {
                    this.setState({ showButton: true });
                    this.setState({ isLoading: false });
                }
            });

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
                        {/* <TouchableOpacity>
                            <View style={styles.forgotPassword}>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </View>
                        </TouchableOpacity> */}
                        {this.state.showButton ? (<TouchableOpacity
                            onPress={this.login}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>SIGN IN</Text>
                            </View>
                        </TouchableOpacity>) : null}
                        <ActivityIndicator size="large" color="#ff3d00" animating={this.state.isLoading} />
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