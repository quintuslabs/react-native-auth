/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import {
    REGISTER_ATTEMPT,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from './Types';
import axios from 'axios';

export const registerUser = ({ UserName, UserEmail, UserMobile, UserPassword }) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_ATTEMPT });

        console.log(UserName + " " + UserEmail + " " + UserMobile + " " + UserPassword)

        axios.post("http://192.168.0.91/restapi/api/register.php", {
            name: UserName,
            email: UserEmail,
            mobile: UserMobile,
            password: UserPassword
        }).then(response => {
            console.log(response.status);
            console.log(response.data);

            if (response.status === 201) {
                handleResponse(dispatch, response.status, response.data)
            }


        }).catch(error => {
            console.log("" + error);
            let errorString = "" + error;
            const code = errorString.substring(errorString.length - 3, errorString.length);
            console.log(code);
            handleResponse(dispatch, code, null);

        });


    }

}


const handleResponse = (dispatch, status, data) => {
    if (status === 201) {
        onRegisterSuccess(dispatch, data.user);

    } else {
        onRegisterFailed(dispatch, "Register Failed ! Please Try Again")
    }

}

const onRegisterSuccess = (dispatch, user) => {
    dispatch({ type: REGISTER_SUCCESS, user });
}
const onRegisterFailed = (dispatch, error) => {
    dispatch({ type: REGISTER_FAILED, error: error });
}