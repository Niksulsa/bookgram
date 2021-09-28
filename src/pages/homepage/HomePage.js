import React, {useState, useEffect} from 'react';
import {db, auth} from '../../firebase.js';
import Cards from '../../components/cards/Cards.js';
import './HomePage.scss';
import axios from 'axios';
import Hero from '../../assets/hero/hero-removebg-preview.png';
import "firebase/auth";
import ImageUpload from '../../components/imageUpload/ImageUpload.js';
import Header from '../../components/header/Header.js';

// const BSN_API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='
const BSN_API_KEY = 't2YjLBGNCtldiy6B946tL3FA3qy7ZEJD';
const url = "https://type.fit/api/quotes"
let data;
const randomNo = () => Math.floor(Math.random() * data.length) + 1;

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [books, setBooks] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState(null);
    const [dataUser, setdataUser] = useState(null);
    


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                if (authUser.displayName) {} else {
                    return authUser.updateProfile({displayName: username})
                }
            } else {
                setUser(null)
            }
        })
        fetchData();
        return() => {
            unsubscribe()
        }
    }, [user, username]);

    const fetchData = () => {
        if (user) {
            db.collection('users').where('user_id', '==', user.uid)
            .get()
            .then(snapshot => {
                // console.log("snapshot", snapshot)
                snapshot.forEach(doc => {
                    // console.log("docData", doc.data())
                    setdataUser(doc.data())
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }



    useEffect(() => {
        db.collection('posts').orderBy("timestamp", 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(postDoc => {
                const postData = {
                    id: postDoc.id,
                    post: postDoc.data()
                }
                return postData
            }))
        })
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
        getQuotes();
    }, [])

    async function getQuotes() {
        try {
            const res = await fetch(url);
            data = await res.json();
            setQuotes(data[randomNo()]);
        } catch (err) {
            console.log(err);
        }
    }


    if (!user || !dataUser) {
        return <p>Loading...</p>
    }

    return (
        <div className="page">
            <Header/>
            <div className="hero">
                <div className="hero__herocontainer">
                    <div className="hero__herotext">
                        <h1 className="hero__welcome">TAKE A READING VACCATION</h1>
                        <h2 className="hero__username"> {
                            dataUser.username
                        }</h2>
                        <div>
                            <p></p>
                        </div>
                        <div className="quotes"> 
                            <p className="quotes__text">
                                {
                                quotes.text
                            }</p>
                            <p className="quotes__author">- {
                                quotes.author ? quotes.author : "Anonymous"
                            }</p>
                            <button className="quotes__button"
                                onClick={getQuotes}>
                                Quote of the day
                            </button>

                        </div>
                    </div>
                    <img className="hero__heroimg"
                        src={Hero}
                        alt=""/>
                </div>
                <h2 className="hero__heading">BESTSELLERS</h2>
                <div className="hero__main">
                    {
                    books.slice(0, 8).map((book) => {
                        const {
                            id,
                            author,
                            book_image,
                            amazon_product_url,
                            title
                        } = book
                        return (
                            <a key={id} href={amazon_product_url}
                                className="hero__container">
                                <div className="hero__imgbox">
                                    <img className="hero__img"
                                        src={book_image}
                                        alt={title}/>
                                </div>
                            </a>
                        )
                    })
                } </div>

            </div>
            <div className="">
                <div className="file">
                    <ImageUpload/>
                </div>
                <div className="articles">
                    {
                    posts.map(({id, post}) => (
                        <Cards key={id}
                            postId={id}
                            userId={
                                post.user_id
                        
                            }
                            currentUsername={dataUser.username}
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
