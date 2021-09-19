import React from 'react';
import'./Header.scss';
import Logo from '../../assets/logo/logo-op.png'

export default function Header() {
    return (
        <div>
            <header className="header">
                <img className="header__logo" src={Logo} alt=""/>
            </header>
        </div>
    )
}
