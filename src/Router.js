//file that outlines all of our 'scenes' for our navigation library to use

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

//notes on below: the scene with the "initial" tag, or first listed scene if there is no tag,
//will be the first screen displayed

//nesting scenes allows you to have proper back/forward buttons. This way, we can't navigate "back"
//to the "auth" route once we're already authenticated (can't go back to the Login screen) 

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="auth">
				<Scene key="login" component={LoginForm} title="Please Login" />
			</Scene>
			<Scene key="main">
				<Scene key="employeeList" 
				component={EmployeeList} 
				title="Employees" 
				rightTitle="Add"
				onRight={() => Actions.employeeCreate()}
				initial
				/>
				<Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
			</Scene>
		</Router>
	);
};

export default RouterComponent;

