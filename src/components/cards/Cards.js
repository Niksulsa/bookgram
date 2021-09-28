import React, {useState, useEffect} from 'react';
import './Cards.scss';
import Avatar from '@mui/material/Avatar'
import {db} from '../../firebase';
import firebase from 'firebase';
import {FacebookIcon} from "react-share";
import {FacebookShareButton} from "react-share";
import Heart from "react-heart";
import Comment from '../../assets/icons/comment.png'


export default function Cards({
    postId,
    userId,
    currentUsername,
    caption,
    imageUrl,
    imagealt
}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState("");
    const [active, setActive] = useState(false)


    // posting comments
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

    // getting user and user id to
    useEffect(() => {
        db.collection('users').where('user_id', '==', userId).get().then(snapshot => {
            snapshot.forEach(userDoc => {
                setUsername(userDoc.data().username)
            })
        }).catch(err => {
            console.log(err)
        })

    }, [userId])

    // adding comment attributes
    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({text: comment, username: currentUsername, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
        setComment('')
    }
    // console.log('typeof ' + typeof comments)
    return (
        <div className="cards">
            <div className="cards__outerbox">
                <div className="cards__container">
                    <div className="cards__userbox">
                        <div className="cards__avataruserbox">
                            <Avatar className="cards__avatar"
                                alt={imagealt}
                                src="/static/images/avatar/3.jpg"/>
                            <div className="cards__headerbox">
                                <h3 className="cards__title">
                                    {username}</h3>
                            </div>
                        </div>
                        <div>
                            <div className="cards__facebookbox">
                                <FacebookShareButton url={"https://peing.net/ja/"}
                                    className="cards__facebook">
                                    <FacebookIcon size={25}
                                        round/>
                                </FacebookShareButton>
                            </div>
                        </div>
                    </div>
                    <div className="cards__heroimg">
                        <img src={imageUrl}
                            className="cards__image"
                            alt=""/>
                        <div className="heart">
                            <div style={
                                {width: "1rem"}
                            }>
                                <Heart isActive={active}
                                    onClick={
                                        () => setActive(!active)
                                    }/>
                            </div>
                        </div>
                    </div>

                    <div className="cards__captionbox">
                        <h4 classname="cards__user">
                            {username}</h4>
                        <p className="cards__caption">
                            {caption}</p>
                    </div>
                    <div className="cards__comments">
                        
                        {
                        comments.map((comment) => (
                            <div>
                                {/* <div className="cards__commentimgbox">
                                    <img className="cards__commentimg"
                                        src={Comment}
                                        alt=""/>

                                </div> */}
                                <div className="cards__username">

                                    <p className="cards__name">
                                        {
                                        comment.username
                                    }</p>
                                    <p className="cards__text">
                                        {
                                        comment.text
                                    }</p>
                                </div>

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
