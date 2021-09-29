import React from 'react';
import'./Header.scss';
import Logo from '../../assets/logo/logo-op-preview.png';
import { Link } from 'react-router-dom';
import Book from '../../assets/logo/book.png';
import Search from '../../assets/logo/search.png';
import { auth } from '../../firebase';
import Home from '../../assets/icons/home-o.png'
// import { auth } from '../../firebase';


export default function Header() {
   
    return ( 
        <div>
            <header className="header">
                <Link to='/home'>
                <img  className="header__logo" src={Logo} alt=""/>
                </Link>
                <div className="header__buttonbox">
                    <Link to="/home">
                    <img src={Home} alt="go-home" className="header__home" />

                    </Link>
                    <Link to='/description'>
                      <img src={Search} alt="search for more books" className="header__more" />
                    </Link> 
                    <Link to='/profile'>
                    <img src={Book} alt="check your profile" className="header__mybooks"/>
                    </Link>
                    <Link className="signout" to='/login'>
                    <button onClick={()=> auth.signOut()} className="header__buttonsignout">Signout</button>
                    </Link>  
                </div>
            </header>         
        </div>
    )
}

