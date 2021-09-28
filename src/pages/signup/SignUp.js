import React, { useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import './SignUp.scss';
import firebaseConfig from '../../firebase';
import {db} from '../../firebase.js';
import Logo from '../../assets/logo/logo-op-preview.png'

function SignUp(){
    const [currentUser, setCurrentUser] = useState(null); 
    const [formData, setFormData] = useState({
      username:'',
      email: '',
      password: ''
    })
 
    const handleSubmit = async (e) => {
      e.preventDefault();    
      const { username ,email, password } = formData;
      //need to connect the 
      let ref = db.collection('users').doc(email)
      try {
         const user = await firebaseConfig.auth().createUserWithEmailAndPassword(email, password)
         await ref.set({
           email:email,
           username:username,
           user_id:user.user.uid
         })
         setFormData({
           email:"",
           username:"",
           password:""
         })    
        setCurrentUser(true);
      } catch (error) {
        alert(error);
      }
    };
    if (currentUser) {
        return <Redirect to="/login" />;
    }

    const handleFormDataInput = e => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className="signup">
                <form  onSubmit={handleSubmit} className="signup__form">
                <img className="signup__logo" src={Logo} alt=""/>
                    <h1 className="signup__heading">
                        Sign Up</h1>
                    <input onChange={handleFormDataInput} className="signup__input" type="text" name="username" placeholder="Username"></input>
                    <input onChange={handleFormDataInput} className="signup__input" type="email"  name="email" placeholder="Email"></input>
                    <input onChange={handleFormDataInput} className="signup__input" type="password"   name="password" placeholder="Password"></input>
                    <div className="signup__buttonbox">
                      <button type="submit" className="signup__button">Sign Up</button>
                    </div>
                </form>
                <p className="log">
                    Have an account?
                    <Link to="/login"> Log in</Link>
                </p>

            </div>
        </div>
    )
}

export default SignUp
