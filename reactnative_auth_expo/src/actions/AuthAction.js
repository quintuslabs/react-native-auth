/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './Types';

import axios from 'axios';
export const loginUser = ({ userEmail, userPassword }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_ATTEMPT });

        //call the backend
        axios.post("http://192.168.0.91/restapi/api/login.php", {
            email: userEmail,
            password: userPassword
        }).then(response => {

            if (response.status === 200 && response.data !== null) {

                handleResponse(dispatch, response.status, response.data)
                // console.log("user details" + JSON.stringify(response.data.user));
                // AsyncStorage.setItem('user', JSON.stringify(response.data.user + ""))
                // this.props.navigation.navigate("Home");
            }

        }).catch(error => {
            console.log("" + error);
            let errorString = "" + error;
            const code = errorString.substring(errorString.length - 3, errorString.length);
            console.log(code);
            handleResponse(dispatch, code, null)

        });
    }

}

const handleResponse = (dispatch, status, data) => {
    if (status === 200) {
        onLoginSuccess(dispatch, data.user);

    } else {
        onLoginFailed(dispatch, "Login Failed ! Please check email and password")
    }

}

const onLoginSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_SUCCESS, user });
}
const onLoginFailed = (dispatch, error) => {
    dispatch({ type: LOGIN_FAILED, error: error });
}