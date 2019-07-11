import {
    REGISTER_ATTEMPT,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from '../actions/Types';

const INITIAL_STATE = { user: null, loading: false, error: null }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_ATTEMPT:
            return { ...state, loading: true }
        case REGISTER_SUCCESS:
            return { ...INITIAL_STATE, loading: false, user: action.user }

        case REGISTER_FAILED:
            return { ...INITIAL_STATE, loading: false, error: action.error }

        default:
            return state;
    }

}

