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


            axios.post("http://192.168.0.4/restapi/api/register.php", {
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
            <View style={styles.container}>
                <StatusBar backgroundColor="#4E3AD9" barStyle="light-content" />


                <View style={styles.loginArea}>
                    <View style={{ height: 30 }} />
                    <Logo />
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



            </View>
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
        flex: 1,
        flexDirection: 'column',
        width: "100%",
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
        marginLeft: 10,
        width: "100%",
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
    nameContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
        backgroundColor: '#F5F6F7'
    },

    emailContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#F5F6F7'
    },
    mobileContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#F5F6F7'
    },

    passwordContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
        backgroundColor: '#F5F6F7'

    }
});