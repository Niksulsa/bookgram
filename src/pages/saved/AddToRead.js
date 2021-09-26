import React from 'react';
import axios from 'axios';
import { useAuth } from '../../Auth';

export default function AddToRead({books}) {
    const { currentUser } = useAuth()

    function entryHandler(){
        const payLoad = books
        axios.post(`https://bookgram-d5394-default-rtdb.firebaseio.com/users/${currentUser.uid}.json`, payLoad)
        .then((response)=>{
            console.log("userdata",response);
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    return (
        <div>
            <button className="button__addtoread" onClick={entryHandler}>Add to Read</button>      
        </div>
    )
}
