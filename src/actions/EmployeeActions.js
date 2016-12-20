import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS } from './types';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export const employeeUpdate = ({prop, value}) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	}
}

export const employeeCreate = ({ name, phone, shift }) => {
	//code below gives us the current user
	const { currentUser } = firebase.auth();
	// wrap this in a return so it works with redux-thunk, because this doesn't technically
	//return an object OR a function
	return (dispatch) => {
	//code below is a path for navigating through JSON keys
	firebase.database().ref(`/users/${currentUser.uid}/employees`)
	//add these values to the database
		.push({ name, phone, shift })
		//afterward, redirect to the employee list and reset all form fields
		.then(() => {
			dispatch({ type: EMPLOYEE_CREATE });
			Actions.employeeList({ type: 'reset'})
		});
		//'reset' in this case means don't create a 'back' button. Reset the entire view stack
	};
};

export const employeesFetch = () => {

	const { currentUser } = firebase.auth();

	return (dispatch) => {
		//we create a reference to a spot in our JSON data so we can work with it
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
		//meaning anytime any data comes across from this ref, call this function on it
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
				//snapshot.val() is the actual data. Apparently 'snapshot' gives us
				//a bunch of other data.

				//also, we get the data back as an object, where the keys are the ID of the record
				//rather than an array, and their values are the record itself. Which is GARBAGE but ok
			});
	};
};