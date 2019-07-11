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
    Alert,
    Keyboard,
    StatusBar,
    ActivityIndicator,
} from 'react-native';

import Logo from './../components/SmallLogo';
import styles from './../assets/theme/styles'
import Snackbar from 'react-native-snackbar';
import axios from 'axios';


export default class RegisterScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            showButton: true,
            isLoading: false,
            UserName: '',
            UserEmail: '',
            UserMobile: '',
            UserPassword: ''

        }

    }

    UserRegistration = () => {


        const { UserName } = this.state;
        const { UserEmail } = this.state;
        const { UserMobile } = this.state;
        const { UserPassword } = this.state;

        Keyboard.dismiss();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (UserName == "") {
            Snackbar.show({
                title: 'Please enter your Name',
                duration: Snackbar.LENGTH_SHORT,
            });

        }
        else if (UserEmail == "") {
            //alert("Please enter Email address");
            //this.setState({ email: 'Please enter Email address' })
            Snackbar.show({
                title: 'Please enter Email address',
                duration: Snackbar.LENGTH_SHORT,
            });

        }

        else if (reg.test(UserEmail) === false) {
            //alert("Email is Not Correct");
            //this.setState({ email: 'Email is Not Correct' })
            Snackbar.show({
                title: 'Please enter correct Email address',
                duration: Snackbar.LENGTH_SHORT,
            });
            return false;
        }

        else if (UserMobile == "") {
            //this.setState({ password: 'Please enter password' })
            Snackbar.show({
                title: 'Please enter Mobile Number',
                duration: Snackbar.LENGTH_SHORT,
            });

        }
        else if (UserMobile.length < 10) {
            //this.setState({ password: 'Please enter password' })
            Snackbar.show({
                title: 'Please enter Correct Mobile Number',
                duration: Snackbar.LENGTH_SHORT,
            });

        }

        else if (UserPassword == "") {
            //this.setState({ password: 'Please enter password' })
            Snackbar.show({
                title: 'Please enter Password',
                duration: Snackbar.LENGTH_SHORT,
            });

        }

        else if (UserPassword.length < 6) {
            //this.setState({ password: 'Please enter password' })
            Snackbar.show({
                title: 'Please enter 6 charactor Password',
                duration: Snackbar.LENGTH_SHORT,
            });

        }
        // else if (strongRegex.test(UserPassword) === false) {
        //     //this.setState({ password: 'Please enter password' })
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


            axios.post("http://192.168.0.91/restapi/api/register.php", {
                name: UserName,
                email: UserEmail,
                mobile: UserMobile,
                password: UserPassword
            }).then(response => {
                console.log(response.status);
                console.log(response.data);

                if (response.status === 201) {
                    Snackbar.show({
                        title: response.data.message,
                        duration: 4000
                    });
                    this.props.navigation.navigate("Login");
                } else {
                    Snackbar.show({
                        title: response.data.message,
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
                if (code == 409) {
                    Snackbar.show({
                        title: "Sorry, this user  already existed",
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
        return (
            <View style={styles.loginContainer}>
                <View style={{ height: 30 }} />
                <Logo />
                <View style={styles.loginArea}>
                    <View style={{ height: 20 }} />
                    <View style={styles.nameContainer}>
                        <TextInput style={styles.textInput} placeholder="Name"
                            keyboardType="name-phone-pad"
                            onChangeText={UserName => this.setState({ UserName })} />
                    </View>

                    <View style={styles.emailContainer}>
                        <TextInput style={styles.textInput} placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={UserEmail => this.setState({ UserEmail })}
                            autoCapitalize='none' />

                    </View>

                    <View style={styles.mobileContainer}>
                        <TextInput style={styles.textInput} placeholder="Mobile"
                            keyboardType="numeric"
                            onChangeText={UserMobile => this.setState({ UserMobile })}
                            autoCapitalize='none'
                            maxLength={10} />

                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.textInput} placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={UserPassword => this.setState({ UserPassword })} />
                    </View>

                    {this.state.showButton ? (<TouchableOpacity
                        onPress={this.UserRegistration} >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </View>
                    </TouchableOpacity>) : null}
                    <ActivityIndicator size="large" color="#ff3d00" animating={this.state.isLoading} />

                </View>


                <View style={styles.newAccountContainer}>
                    <View style={styles.normalContainer}>
                        <Text style={styles.normalText}>Do you have an account?</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigate('Login')}>
                        <View style={styles.createAccount}>
                            <Text style={styles.createText}>Please Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
