import React from 'react';
import'./Header.scss';
import Logo from '../../assets/logo/logo-op.png';
import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';


export default function Header() {
    
    return (
        <div>
            <header className="header">
                <Link to='/home'>
                <img  className="header__logo" src={Logo} alt=""/>
                </Link>
                <div className="header__buttonbox">
                    <Link to='/profile'>
                    <a className="header__mybooks"> My Books</a>
                    </Link>
                    <Link to='/description'>
                      <a className="header__more">More Books</a> 
                    </Link> 
                    <Link to='/login'>
                    <button  className="header__buttonsignout">Signout</button>
                    </Link>  
                </div>

            </header>
                
        </div>
    )
}
