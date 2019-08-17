/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import {
    LOADING_USERS,
    LOADING_SUCCESS,
    LOADING_FAILED
} from './Types';
import axios from 'axios';

export const fetchUserList = () => {

    return (dispatch) => {
        dispatch({ type: LOADING_USERS });

        axios.get('http://192.168.0.90/restapi/api/users.php')
            .then(response => {
                console.log(response.status);
                console.log(response.data.users);
                handleResponse(dispatch, response.status, response.data)
            })
            .catch(error => {
                console.log(error);
                let errorString = "" + error;
                const code = errorString.substring(errorString.length - 3, errorString.length);
                console.log(code);
                handleResponse(dispatch, code, null)
            });
    }


}

const handleResponse = (dispatch, status, data) => {
    if (status === 200) {
        onLoadingSuccess(dispatch, data.users);

    } else {
        onLoadingFailed(dispatch, "Login Failed ! Please check email and password")
    }

}

const onLoadingSuccess = (dispatch, users) => {
    dispatch({ type: LOADING_SUCCESS, users });
}
const onLoadingFailed = (dispatch, error) => {
    dispatch({ type: LOADING_FAILED, error: error });
}