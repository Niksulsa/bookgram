import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Video from './Description.scss';
import Hero from '../../assets/video/hero-video.mp4'
//import StarRatings from './react-star-ratings';

export default function Description() {
    const [books, setbooks] = useState("");
    const [results, setResults] = useState([]);

    function handleChange(event) {
        const books = event.target.value
        setbooks(books);
    }
    function handleSubmit(event) {
        event.preventDefault();
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${books}`).then(data => { console.log(data.data.items);// console.log(data.data.items)
            setResults(data.data.items)

        })

    }

    const Star = ({ selected = false, onClick = f => f }) => (
        <div className={selected ? "star selected" : "star"} onClick={onClick} />
      );
      

    return (
        <div className="">
            <div className="search">
                {/* <video className="search__video" src={Hero} autoPlay muted loop/> */}
                <div className="search__headingbox">
                    <h1 className="search__heading">Search and Add</h1>
                </div>
                <div className="search__form">
                    <form className="search__searchform"
                        onSubmit={handleSubmit}>
                        <div className="search__searchcontainer">
                            <input className="search__input"
                                onChange={handleChange}
                                type="text"
                                placeholder="Search for books.."></input>
                        </div>
                        <button type="submit" className=" search__searchbutton">Search</button>
                    </form>
                </div>
                {
                results.map(book => (
                    <div className="desc">
                        <div className="desc__container">
                            <div className="desc__imagebox">
                                <img className="desc__images"
                                    src={
                                        book.volumeInfo.imageLinks.thumbnail
                                    }
                                    alt={
                                        book.title
                                    }/>
                                <div className="desc__author">
                                    {
                                    book.volumeInfo.authors[0]
                                }</div>
                            </div>

                            <div className="desc__descbox">
                                <div>
                                    <h3>{
                                        book.volumeInfo.title
                                    }</h3>
                                </div>
                                <div className="desc__rating">
                                    <p>{
                                        book.volumeInfo.averageRating
                                    }</p>
                                </div>
                                <div className="desc__description">
                                    <p>{
                                        book.volumeInfo.description
                                    }</p>
                                </div>
                            </div>

                        </div>

                        <div className="button">
                            <div>
                                <button>ADD TO READ</button>
                                <button>READ</button>
                            </div>
                            <div>
                                <a href={
                                    book.volumeInfo.infoLink
                                }>
                                    <button>
                                        GoogleLink</button>
                                </a>
                            </div>
                        </div>


                    </div>
                ))
            } </div>

        </div>

    )
}
