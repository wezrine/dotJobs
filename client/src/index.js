import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'

import { setAuthenticationHeader } from './utils/authenticate';
import requireAuth from './components/requireAuth'

//Components
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import BaseLayout from './components/BaseLayout';
import JobPage from './components/JobPage'
import DetailsPage from './components/DetailsPage'
import AddJobPage from './components/AddJobPage';
import UpdateJobPage from './components/UpdateJobPage'
import HowItWorksPage from './components/HowItWorksPage'


// Redux
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Authentication
const token = localStorage.getItem("jsonwebtoken")
setAuthenticationHeader(token)
store.dispatch({type: 'ON_LOGIN', payload: token})

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
              <Route exact path = '/' component = {LandingPage} />
              <Route path = '/login' component = {Login} />
              <Route path = '/how-it-works' component = {HowItWorksPage} />
              <Route path = '/jobs' component = {requireAuth(JobPage)} />
              <Route path = '/details/:jobId' component = {requireAuth(DetailsPage)} />
              <Route path = '/add-job' component = {requireAuth(AddJobPage)} />
              <Route path = '/update-job/:jobId' component = {requireAuth(UpdateJobPage)} />
            </Switch> 
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
