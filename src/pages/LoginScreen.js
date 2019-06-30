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

const { height } = Dimensions.get('window');

export default class RegisterScreen extends Component {

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

            axios.post("http://192.168.0.4/restapi/api/login.php", {
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
            <View style={styles.container}>
                <StatusBar backgroundColor="#4E3AD9" barStyle="light-content" />

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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },

    loginArea: {
        padding: 5,
    },
    newAccountContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    normalText: {
        color: '#000000',
        fontSize: 14,
        alignItems: 'center',
        textAlign: 'center',
        padding: 5,
    },
    createText: {
        color: '#FF7260',
        fontSize: 14,
        alignItems: 'center',
        textAlign: 'center',
        padding: 5,
    },
    forgotText: {
        color: '#ffffff',
        fontSize: 14,
        alignItems: 'flex-end',
        textAlign: 'right',
        width: '100%',
        padding: 5,
    },
    logoContiner: {
        height: 200,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    welcome: {
        fontSize: 25,
        color: '#5B5A5A',
        letterSpacing: 6
    },
    textInput: {
        color: '#989899',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        margin: 5,
        marginLeft: 20,
    },
    button: {
        width: '100%',
        borderColor: '#129793',
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 24,
        marginTop: 20,
        backgroundColor: '#129793',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#129793',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    buttonText: {
        color: 'white',
        fontSize: 12
    },
    emailContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomWidth: 1,
        backgroundColor: '#F5F6F7',
        marginBottom: 8,
    },
    passwordContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F5F6F7'

    },
    scrollview: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: "space-between",
        padding: 10,
    },
});