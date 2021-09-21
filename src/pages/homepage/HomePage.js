import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import {db} from '../../firebase.js';
import Cards from '../../components/cards/Cards.js';
import './HomePage.scss';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../Auth";
import firebaseConfig from "../../firebase";
import Hero from '../../assets/hero/hero.jpg'
//const BSN_API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='
const BSN_API_KEY = 't2YjLBGNCtldiy6B946tL3FA3qy7ZEJD';


export default function HomePage() {
    const currentUser = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [books, setBooks] = useState([]);

    // Runs a code based on condition

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        }) // happens whenever a post is posted and snapshot is taken

    }, [])

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${BSN_API_KEY}`)
            setBooks(res.data.results.books)
            console.log(res.data.results.books);
        } 
        fetchBooks();
    }, []);


    return (
        <div class="page">  
            <div className="hero">
                <div className="hero__herocontainer">
                    <img className="hero__heroimg" src={Hero} alt=""/>
                </div>
                <h2 className="hero__heading">Recommended Books</h2>
                <div className="hero__main">
                    {
                    books.slice(0, 8).map((book) => {
                        const {author, book_image, title} = book
                        return (
                            <article className="hero__container">
                                <div className="hero__imgbox">
                                    <img className="hero__img"
                                        src={book_image}
                                        alt={title}/>
                                </div>
                                <p className="hero__author">by {author}</p>
                            </article>
                        )
                    })
                } </div>

            </div>
            <div className="articles"> {
                posts.map(({id, post}) => (
                    <Cards key={id}
                        username={
                            post.username
                        }
                        caption={
                            post.caption
                        }
                        imageUrl={
                            post.imageUrl
                        }/>
                ))
            } </div>
        </div>

    );
}
