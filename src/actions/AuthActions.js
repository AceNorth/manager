import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_START
 } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	}
}

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	}
}

export const loginUser = ({ email, password}) => {
	return (dispatch) => {
		
		dispatch({ type: LOGIN_USER_START })

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => loginUserSuccess(dispatch, user))
					.catch(() => loginUserFail(dispatch));
			})

		};
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	//navigates us to the proper Scene! Neat!
	//just enter "Actions." and the scene's key, which is a function that navigates us
	//to the intended scene
	Actions.main();
};