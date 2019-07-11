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
