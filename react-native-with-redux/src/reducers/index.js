import { combineReducers } from 'redux';
import AuthReducer from './AuthReducre';
import RegisterReducer from './RegisterReducer';
import UserListReducer from './UserListReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    userList: UserListReducer,

})