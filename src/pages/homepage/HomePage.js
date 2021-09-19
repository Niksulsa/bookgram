import React,{useState, useEffect} from 'react';
import { db } from '../../firebase.js';
import Cards from '../../components/cards/Cards.js';
import './HomePage.scss';
import axios from 'axios';
const BSN_API_URL= 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [books, setBooks]= useState([]);
    //Runs a code based on condition

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()
            })))
        })// happens whenever a post is posted and snapshot is taken

    },[])

    useEffect(()=>{
       fetch(`${BSN_API_URL}t2YjLBGNCtldiy6B946tL3FA3qy7ZEJD`)
       .then(response=> response.json())
       .then(data=>setBooks(data.message))
    },[])

    return (
        <div class="page">
            <h2>Recommended Books</h2>
        {posts.map(({id,post})=>(
            <Cards key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))}    
        </div>
    );
}
