import React, {useState, useEffect} from 'react';
import './Cards.scss';
import Avatar from '@mui/material/Avatar'
import {db} from '../../firebase';
import firebase from 'firebase';

export default function Cards({
    postId,
    username,
    caption,
    imageUrl,
    imagealt
}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("")

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }
        return() => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            // username:username.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComments('');

    }

    return (
        <div className="">
            <div>
                <img src={imageUrl}
                    className="card__image"
                    alt=""/>
                <div className="card__overlay">
                    <div className="card__header">
                        <Avatar className="card__avatar"
                            alt={imagealt}
                            src="/static/images/avatar/3.jpg"/>
                        <div className="card__header-text">
                            <h3 className="card__title">
                                {username}</h3>
                            <span className="card__status">1 hour ago</span>
                        </div>
                    </div>
                    <div>
                    <p className="card__caption">
                        {caption}</p>

                    </div>
                    <div>
                        {comments.map((comment)=>(
                            <div>
                                {/* <b>{comment.username}</b> */}
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <form>
                        <input className="" type="text" placeholder="Add a comment"
                            value={comment}
                            onChange={
                                (e) => setComment(e.target.value)
                            }/>
                        <button className=""
                            disabled={
                                !comment
                            }
                            type="submit"
                            onClick={postComment}>Comment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
