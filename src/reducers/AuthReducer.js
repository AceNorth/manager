import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_START
} from '../actions/types';

const INITIAL_STATE = { email: '', password: '', user: null, error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return Object.assign({}, state, {email: action.payload})
			//or {..state, email: action.payload } would do the same thing
		case PASSWORD_CHANGED:
			return Object.assign({}, state, {password: action.payload})
		case LOGIN_USER_START:
			return Object.assign({}, state, {loading: true, error: ''})
		case LOGIN_USER_SUCCESS:
			//reset everything to initial state so we're not storing the form data
			return Object.assign({}, state, INITIAL_STATE, { user: action.payload })
		case LOGIN_USER_FAIL:
			return Object.assign({}, state, {error: 'Authentication Failed.', password: '', loading: false})
		default: 
			return state;
	}
}