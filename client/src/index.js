import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import BaseLayout from './components/BaseLayout';
import JobPage from './components/JobPage'
import DetailsPage from './components/DetailsPage'
import AddJobPage from './components/AddJobPage';
import UpdateJobPage from './components/UpdateJobPage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
            <Route exact path = '/' component = {LandingPage} />
            <Route path = '/jobs' component = {JobPage} />
            <Route path = '/details/:jobId' component = {DetailsPage} />
            <Route path = '/add-job' component = {AddJobPage} />
            <Route path = '/update-job/:jobId' component = {UpdateJobPage} />
          </Switch> 
      </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
