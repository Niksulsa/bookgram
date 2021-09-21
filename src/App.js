import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './pages/signup/SignUp';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/login/LoginPage';
import Header from './components/header/Header'


function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/login" exact
                    component={LoginPage}/>
                <Route path="/home"
                    component={HomePage}/>
                <Route path="/signup" exact
                    component={SignUp}/>
            </Switch>
        </Router>
    );
}

export default App;
