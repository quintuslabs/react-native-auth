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
import { connect } from 'react-redux';
import { registerUser } from '../actions'
import AsyncStorage from '@react-native-community/async-storage';


class RegisterScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            UserEmail: '',
            UserMobile: '',
            UserPassword: ''

        }

    }

    async componentWillReceiveProps(nextProps) {
        console.log("Reciving Props.....");
        console.log(nextProps);
        await AsyncStorage.setItem('user', JSON.stringify(nextProps.user))
            .then(() => {
                console.log('It was saved successfully')
            })
            .catch(() => {
                console.log('There was an error saving the product')
            })
        if (nextProps.user != null) {
            Snackbar.show({
                title: 'Register Successfull !!',
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

        else {

            this.props.registerUser({ UserName, UserEmail, UserMobile, UserPassword });

        }

    }

    _renderButton() {

        if (this.props.loading) {
            return <ActivityIndicator size="large" color="#ff3d00" animating={this.props.loading} />;
        } else {
            return (<TouchableOpacity
                onPress={this.UserRegistration}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </View>
            </TouchableOpacity>);
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

                    {this._renderButton()}

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



const mapStateToProps = state => {
    return {
        error: state.register.error,
        loading: state.register.loading,
        user: state.register.user,
    }
}

export default connect(mapStateToProps, { registerUser })(RegisterScreen);