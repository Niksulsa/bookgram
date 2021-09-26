import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import './Description.scss';
import AddToRead from '../../pages/saved/AddToRead';


export default function Description() {
    const [books, setbooks] = useState("");
    const [results, setResults] = useState([]);

//for the search input to connect it with the api url as a query
    function handleChange(event) {
        const booksInput = event.target.value
        setbooks(booksInput);
    }


    //getting google books
    function handleSubmit(event) {
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${books}`)
        .then(data => {
            // console.log(data)
            setResults(data.data.items)
        })

    }

    console.log("results",results)
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
                results.map((book,id) => (
                    <div className="desc">
                        <div className="desc__container">
                            <div className="desc__imagebox">
                                <img className="desc__images"
                                    src={
                                        book.volumeInfo.imageLinks?.thumbnail
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
                                <div className="desc__title">
                                    <h3>{
                                        book.volumeInfo.title
                                    }</h3>
                                </div>
                                <div className="desc__rating">
                                    <p>{
                                        book.volumeInfo.averageRating
                                    }</p>
                                    <div>
                                    </div>

                                </div>
                                <div className="desc__description">
                                    <p>{
                                        book.volumeInfo.description
                                    }</p>
                                </div>
                            </div>

                        </div>

                        <div className="button">
                            <div className="button__category">
                                <AddToRead books={results[id]} className="button__addtoread"/>
                                <button className="button__addtoread">READ</button>
                            </div>
                            <div className="button__googlebox">
                                <a href={
                                    book.volumeInfo.infoLink
                                }>
                                    <button className="button__googlebutton">
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
