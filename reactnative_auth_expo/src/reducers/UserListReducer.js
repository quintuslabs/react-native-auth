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
} from '../actions/Types';

const INITIAL_STATE = { users: null, loading: false, error: null }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_USERS:
            return { ...state, loading: true }
        case LOADING_SUCCESS:
            return { ...INITIAL_STATE, loading: false, users: action.users }

        case LOADING_FAILED:
            return { ...INITIAL_STATE, loading: false, error: action.error }

        default:
            return state;
    }

}
