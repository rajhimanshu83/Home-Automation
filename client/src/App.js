import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import AddDevices from './pages/AddDevices';
import './App.scss';

function App() {
  return (
    <React.Fragment>
		<Switch>
		  <Route exact path="/" component={HomePage} />
		  <Route exact path="/add/device" component={AddDevices} />
		  {/* <Route component={ErrorPage} /> */}
		</Switch>
	  </React.Fragment>
  );
}

export default App;
