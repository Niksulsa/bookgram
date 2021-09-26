import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../Auth';
import './ProfilePage.scss';


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


    return (
        <div>
            <h2>Reading List</h2>
            <div className="addedcontainer"> {
                results.length !== 0 && results.map((book, index) => (
                    <div className="added">
                        <div className="added__container">
                            <div className="added__imagebox">
                            <div>
                                    <h3>{
                                        book[1].volumeInfo.title
                                    }</h3>
                                </div>
                                <img className="added__images"
                                    src={
                                        book[1].volumeInfo.imageLinks ?. thumbnail
                                        // book[1].volumeInfo.imageLinks?.thumbnail
                                    }
                                    alt={
                                        book[1].title
                                    }/>
                                <div className="added__author">
                                    {
                                    book[1].volumeInfo.authors[0]
                                }
                                </div>
                            </div>

                            <div className="addedbutton">
                            <div className="addedbutton__category">
                                <button onClick={
                                        () => removeBook(book[0], index)
                                    }
                                    className="addedbutton__addtoread">Delete</button>
                            </div>
                            <div className="addedbutton__googlebox">
                                <a href={
                                    book[1].volumeInfo.infoLink
                                }>
                                    <button className="addedbutton__googlebutton">
                                        GoogleLink</button>
                                </a>
                            </div>
                        </div>

                        </div>

                    </div>
                ))
            } </div>

        </div>
    )
}
