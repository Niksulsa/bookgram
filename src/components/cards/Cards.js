import React from 'react';
import './Cards.scss';
import Avatar from '@mui/material/Avatar'

export default function Cards({username,caption,imageUrl,imagealt}) {
    return (
        <div className="">
            <div>
                <ul className="cards">
                    <li className="card">
                        <img src={imageUrl}
                            className="card__image"
                            alt=""/>
                        <div className="card__overlay">
                            <div className="card__header">
                            <Avatar className="card__avatar" alt={imagealt} src="/static/images/avatar/3.jpg" />
                                <div className="card__header-text">
                                    <h3 className="card__title">{username}</h3>
                                    <span className="card__status">1 hour ago</span>
                                </div>
                            </div>
                            <p className="card__caption">{caption}</p>
                        </div>
                    </li>
                </ul>
            </div>
         </div>
    )
}
