import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './pages/signup/SignUp';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/login/LoginPage';
import Header from './components/header/Header'
//import Search from './components/Search/Search';
import Description from './components/description/Description';
import ProfilePage from './pages/profile/ProfilePage';


function App() {
    return (
        <Router className="app">
            <Header/>
            <Switch>
                <Route path="/login" exact
                    component={LoginPage}/>
                <Route path="/home"
                    component={HomePage}/>
                <Route path="/signup" exact
                    component={SignUp}/>
                <Route path="/description" exact
                    component={Description} />  
                <Route path="/profile" exact
                    component={ProfilePage}/>
            </Switch>
        </Router>
    );
}

export default App;
