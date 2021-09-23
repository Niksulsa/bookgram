import React, { useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import './SignUp.scss';
//import { auth } from '../../firebase';
import firebaseConfig from '../../firebase';
import {db} from '../../firebase.js';

function SignUp(){
    const [currentUser, setCurrentUser] = useState(null); 
 
    const handleSubmit = async (e) => {
      e.preventDefault();    
      const { username ,email, password } = e.target.elements;
      let ref = db.collection("users").doc(currentUser.email)
      try {
        const user = await firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);      
        await ref.set({
          username,
          email,
          posts:[],
          user_id: user.user.uid
        })
        setCurrentUser(true);
      } catch (error) {
        alert(error);
      }
    };
    if (currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <div className="signup">
                <form  onSubmit={handleSubmit} className="signup__form">
                    <h1 className="signup__heading">
                        Sign Up</h1>
                    <input className="signup__input" type="text" name="username" placeholder="Username"></input>
                    <input className="signup__input" type="email"  name="email" placeholder="Email"></input>
                    <input className="signup__input" type="password"   name="password" placeholder="Password"></input>
                    <div className="signup__buttonbox">
                      <button type="submit" className="signup__button">Sign Up</button>
                    </div>
                </form>
                <p>
                    Have an account?
                    <Link to="/login">Log in</Link>
                </p>

            </div>
        </div>
    )
}

export default SignUp
