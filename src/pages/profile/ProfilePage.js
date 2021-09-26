import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../Auth';


export default function ProfilePage() {
    const {currentUser} = useAuth();
    const [results, setResults] = useState([]);
    

    useEffect(() => {
        axios.get(`https://bookgram-d5394-default-rtdb.firebaseio.com/users/${currentUser.uid}.json`)
        .then((response => { // let initialObject = {...response}
            if( response.data){

            
            let convert = Object.entries(response.data)
            setResults(convert)
            // setResults([])
            console.log(convert)
            // setResults(data.data.items)
        }
        }))

    }, [])

    const removeBook = (id, index) => {
        console.log("id",id)
        axios.delete(`https://bookgram-d5394-default-rtdb.firebaseio.com/users/${currentUser.uid}/${id}.json`)
        .then(res => {
            console.log(res)
           console.log(results)
           const resultsCopy = [...results]
           resultsCopy.splice(index, 1)
           setResults(resultsCopy)
        })
        .catch(err=>{
            console.log(err)
        })
    }



    return (
        <div>
            <div> {
                results.length !== 0 && results.map((book, index) => (
                    <div className="desc">
                        <div className="desc__container">
                            <div className="desc__imagebox">
                                <img className="desc__images"
                                    src={
                                        book[1].volumeInfo.imageLinks ?. thumbnail
                                        // book[1].volumeInfo.imageLinks?.thumbnail
                                    }
                                    alt={
                                        book[1].title
                                    }/>
                                <div className="desc__author">
                                    {
                                    book[1].volumeInfo.authors[0]
                                }</div>
                            </div>

                            <div className="desc__descbox">
                                <div>
                                    <h3>{
                                        book[1].volumeInfo.title
                                    }</h3>
                                </div>
                                <div className="desc__rating">
                                    <p>{
                                        book[1].volumeInfo.averageRating
                                    }</p>
                                    <div></div>

                                </div>
                                {/* <div className="desc__description">
                                    <p>{
                                        book[1].volumeInfo.description
                                    }</p>
                                </div> */} </div>

                        </div>

                        <div className="button">
                            <div className="button__category">
                                <button onClick={() => removeBook(book[0], index)}
                                    className="button__addtoread">Delete</button>
                            </div>
                            <div className="button__googlebox">
                                <a href={
                                    book[1].volumeInfo.infoLink
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
