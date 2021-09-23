import React,{useState} from 'react';
import './LoginPage.scss';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebaseConfig from "../../firebase";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const history = useHistory()
  const handleFormDataInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = formData
    console.log(email)
    console.log(password)
    try {
      await firebaseConfig.auth().signInWithEmailAndPassword(email, password);
      history.push('/home')
    } catch (error) {
      alert(error);
    }
  };
  // const currentUser = useContext(AuthContext);
  // if (currentUser) {
  //   return <Redirect to="/home" />;
  // }
    return (
        <div>
            <div className="signin">
                <form onSubmit={handleSubmit} className="signin__form">
                    <h1 className="signin__heading">
                        Sign In</h1>
                    <input onChange={handleFormDataInput} className="signin__input" type="text" name="email" placeholder="Email"></input>
                    <input onChange={handleFormDataInput} className="signin__input" type="password" name="password" placeholder="Password"></input>
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
