/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import UserListReducer from './UserListReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    userList: UserListReducer,

})