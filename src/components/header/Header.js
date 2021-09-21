import React from 'react';
import'./Header.scss';
import Logo from '../../assets/logo/logo-op.png';
import Search from '../search/Search';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Header() {
    const [books, setbooks] = useState("");
    const [results, setResults]= useState([]);
    
    function handleChange(event){
        const books=event.target.value
        setbooks(books);
    }
    function handleSubmit(event){
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${books}`)
        .then(data=>{
            console.log(data.data.items)
            setResults(data.data.items)
           
        })

    }
    return (
        <div>
            <header className="header">
                <Link to='/home'>
                <img  className="header__logo" src={Logo} alt=""/>
                </Link>
                <div className="header__buttonbox">
                    <Link to='/description'>
                      <button className="header__button">More Books</button> 
                    </Link>   
                </div>
            </header>
                
        </div>
    )
}
