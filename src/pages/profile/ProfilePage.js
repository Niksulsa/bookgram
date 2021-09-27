import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../Auth';
import './ProfilePage.scss';
import Header from '../../components/header/Header';


export default function ProfilePage() {
    const {currentUser} = useAuth();
    const [results, setResults] = useState([]);


    useEffect(() => {
        axios.get(`https://bookgram-d5394-default-rtdb.firebaseio.com/users/${
            currentUser.uid
        }.json`).then((response => { // let initialObject = {...response}
            if (response.data) {
                let convert = Object.entries(response.data)
                setResults(convert)
                // setResults([])
                console.log(convert)
                // setResults(data.data.items)
            }
        }))

    }, [])

    const removeBook = (id, index) => {
        console.log("id", id)
        axios.delete(`https://bookgram-d5394-default-rtdb.firebaseio.com/users/${
            currentUser.uid
        }/${id}.json`).then(res => {
            console.log(res)
            console.log(results)
            const resultsCopy = [...results]
            resultsCopy.splice(index, 1)
            setResults(resultsCopy)
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(results.length)
    return (
        <div>
            <Header/>
            <div className="page">
                <div className="heading">
                <h2 className="heading__title">Reading </h2>
                    <span className="heading__number">{
                    results.length
                }</span>
                </div>
                <div className="addedcontainer">
                    {
                    results.length !== 0 && results.map((book, index) => (
                        <div className="added">
                            <figure class="added__block">
                                <h1 className="added__title">{
                                    book[1].volumeInfo.title
                                }</h1>
                                <img className="added__images" src={
                                        book[1].volumeInfo.imageLinks ?. thumbnail
                                    }
                                    alt={
                                        book[1].title
                                    }/>
                                <figcaption className="added__caption">
                                    <h3 className="added__author">
                                    {
                                        book[1].volumeInfo.authors[0]
                                    }
                                    </h3>
                
                                    <button className="added__delete" onClick={
                                                () => removeBook(book[0], index)
                                            }>
                                        Delete
                                    </button>
                                    <a className="added__googlelink" href={
                                            book[1].volumeInfo.infoLink
                                        }>
                                            <button className="added__googlebutton">
                                                GoogleLink</button>
                                        </a>
                                </figcaption>
                            </figure>
                        </div>
                    ))
                } </div>

            </div>
        </div>
    )
}
