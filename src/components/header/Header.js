import React from 'react';
import'./Header.scss';
import Logo from '../../assets/logo/logo-op-preview.png';
import { Link } from 'react-router-dom';
import Book from '../../assets/logo/book.png';
import Search from '../../assets/logo/search.png';
// import { auth } from '../../firebase';


export default function Header() {
    
    return (
        <div>
            <header className="header">
                <Link to='/home'>
                <img  className="header__logo" src={Logo} alt=""/>
                </Link>
                <div className="header__buttonbox">
                    <Link to='/description'>
                      <img src={Search} className="header__more" /> 
                      {/* <span>SEARCH</span> */}
                    </Link> 
                    <Link to='/profile'>
                    <img src={Book} className="header__mybooks"/>
                    </Link>
                    <Link className="signout" to='/login'>
                    <button  className="header__buttonsignout">Signout</button>
                    </Link>  
                </div>
            </header>         
        </div>
    )
}
