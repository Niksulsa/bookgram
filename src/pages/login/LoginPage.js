import React from 'react';
import './LoginPage.scss';
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div>
            <div className="signin">
                <form className="signin__form">
                    <h1 className="signin__heading">
                        Sign In</h1>
                    <input className="signin__input" type="text" name="email" placeholder="Email"></input>
                    <input className="signin__input" type="password" name="password" placeholder="Password"></input>
                    <div className="signin__buttonbox">
                        <button className="signin__button">Sign In</button>
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
