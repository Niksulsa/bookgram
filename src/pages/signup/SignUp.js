import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './SignUp.scss';
import { auth } from '../../firebase';
export default function SignUp() {
    const [username, setUsername] =useState('');
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('');
    const [user,setUser]=useState('');

    const signUp=(event)=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .catch((error)=> alert(error.message))

    }
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                //user logged in
                setUser(authUser)
                // if(authUser.displayName){
                //     //dont update the username
                // }else{

                //     return authUser.updateProfile({
                //         displayName:username,
                //     })
                // }
            }else{
                //user logged out
                setUser(null)
            }
        })
        return()=>{
            unsubscribe()
        }
    },[user, username])

    return (
        <div>
            <div className="signup">
                <form className="signup__form">
                    <h1 className="signup__heading">
                        Sign Up</h1>
                    <input onChange={(e)=>setUsername(e.target.value)} className="signup__input" type="text" name="username" placeholder="Username"></input>
                    <input onChange={(e)=>setEmail(e.target.value)} className="signup__input" type="text" name="email" placeholder="Email"></input>
                    <input onChange={(e)=>setPassword(e.target.value)} className="signup__input" type="password" name="password" placeholder="Password"></input>
                    <div className="signup__buttonbox">
                      <button type="submit" onClick={signUp} className="signup__button">Sign Up</button>
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
