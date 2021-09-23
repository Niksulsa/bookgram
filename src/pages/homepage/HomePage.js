import React, {useState, useEffect} from 'react';
import {db, auth} from '../../firebase.js';
import Cards from '../../components/cards/Cards.js';
import './HomePage.scss';
import axios from 'axios';
import Hero from '../../assets/hero/hero.jpg';
import "firebase/auth";
import ImageUpload from '../../components/imageUpload/ImageUpload.js';
// const BSN_API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='
const BSN_API_KEY = 't2YjLBGNCtldiy6B946tL3FA3qy7ZEJD';


export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [books, setBooks] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)
                setUser(authUser);
                if (authUser.displayName) {} else {
                    return authUser.updateProfile({displayName: username})
                }

            } else {
                setUser(null)
            }
        })
        return() => {
            unsubscribe()
        }
    }, [user, username]);


    // Runs a code based on condition

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        })
        // happens whenever a post is posted and snapshot is taken
        // authListener()
    }, [])

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${BSN_API_KEY}`)
            setBooks(res.data.results.books)
            // console.log(res.data.results.books);
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        fetch("https://type.fit/api/quotes").then(function (response) {
            return response.json();
        }).then(function (data) {
            setQuotes(data);
        });
    }, [])

    console.log(user)
    return (
        <div className="page">
            <div className="hero">
                <div className="hero__herocontainer">
                    <div>
                        <h1>Welcome</h1>
                        {username}
                        {
                        quotes.slice(0, 1).map((quote) => {
                            return (
                                <div>
                                    <div>{
                                        quote.text
                                    }</div>
                                    <p>-{
                                        quote.author
                                    }</p>
                                </div>
                            )
                        })
                    } </div>
                    <img className="hero__heroimg"
                        src={Hero}
                        alt=""/>
                </div>
                <h2 className="hero__heading">Recommended Books</h2>
                <div className="hero__main">
                    {
                    books.slice(0,8).map((book) => {
                        const {id, author, book_image, title} = book
                        return (
                            <article
                                className="hero__container">
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
            <div className="">
                <div class="file">
                    <ImageUpload />
                </div>
                <div className="articles">
                    {
                    posts.map(({id, post}) => (
                        <Cards key={id}
                        postId={id}
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

        </div>

    );
}
