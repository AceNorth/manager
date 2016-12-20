import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, Text } from 'react-native';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

class App extends Component {

	componentWillMount() {
		const config = {
		    apiKey: "AIzaSyD2rTkg1lkB0p7aCBEdKKVMCRBiXkWDndI",
		    authDomain: "manager-9fdb0.firebaseapp.com",
		    databaseURL: "https://manager-9fdb0.firebaseio.com",
		    storageBucket: "manager-9fdb0.appspot.com",
		    messagingSenderId: "386950346079"
		  };
		  firebase.initializeApp(config);
	}

	render() {
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<Router />
			</Provider>

			)
	}
}

export default App;