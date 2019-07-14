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
} from '../actions/Types';
const INITIAL_STATE = { user: null, loading: false, error: null }


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return { ...state, loading: true }
        case LOGIN_SUCCESS:
            return { ...INITIAL_STATE, loading: false, user: action.user }

        case LOGIN_FAILED:
            return { ...INITIAL_STATE, loading: false, error: action.error }

        default:
            return state;
    }

}