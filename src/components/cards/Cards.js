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
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", 'desc').onSnapshot((snapshot) => {
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
            text: comment,
            // username:username.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComments('');

    }

    return (
        <div className="cards">
            <div className="cards__outerbox">
                <div className="cards__container">
                    <div className="cards__userbox">
                        <Avatar className="cards__avatar"
                            alt={imagealt}
                            src="/static/images/avatar/3.jpg"/>
                        <div className="cards__headerbox">
                            <h3 className="cards__title">
                                {username}</h3>
                        </div>
                    </div>
                    <div className="cards__heroimg">
                        <img src={imageUrl}
                            className="cards__image"
                            alt=""/>
                    </div>
                    <div className="cards__captionbox">
                        <p className="card__caption">
                            {caption}</p>
                    </div>
                    <div className="cards__comments"> {
                        comments.map((comment) => (
                            <div className="cards__username">
                                {/* <b>{comment.username}</b> */}
                                <p classname="cards__text">
                                    {
                                    comment.text
                                }</p>
                            </div>
                        ))
                    } </div>
                    <div className="cards__formbox">
                        <form className="cards__form">
                            <input className="cards__input" type="text" placeholder="Add a comment"
                                value={comment}
                                onChange={
                                    (e) => setComment(e.target.value)
                                }/>
                            <button className="cards__button"
                                disabled={
                                    !comment
                                }
                                type="submit"
                                onClick={postComment}>Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
