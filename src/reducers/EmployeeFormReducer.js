import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE } from '../actions/types';

const INITIAL_STATE = {
	name:'',
	phone: '',
	shift: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMPLOYEE_UPDATE:
			//action.payload == {prop: 'name', value: 'Dumbus'}
			//so we can use ES6 to do a fancy thing
			return { ...state, [action.payload.prop]: action.payload.value};
		case EMPLOYEE_CREATE:
		//to reset forms after an employee is created
			return INITIAL_STATE;
		default:
			return state;
	}
};