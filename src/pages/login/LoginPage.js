import React from 'react';
import './LoginPage.scss';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Auth";
import firebaseConfig from "../../firebase";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(e.target.elements)
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const currentUser = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/home" />;
  }
    return (
        <div>
            <div className="signin">
                <form onSubmit={handleSubmit} className="signin__form">
                    <h1 className="signin__heading">
                        Sign In</h1>
                    <input  className="signin__input" type="text" name="email" placeholder="Email"></input>
                    <input  className="signin__input" type="password" name="password" placeholder="Password"></input>
                    <div className="signin__buttonbox">
                        <button type="submit" className="signin__button">Sign In</button>
                    </div>
                </form>
                <p>
                    Need an account?
                    <Link to="/signup">Sign up</Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage
