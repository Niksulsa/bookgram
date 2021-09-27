import React from 'react';
import axios from 'axios';
import { useAuth } from '../../Auth';
import './AddToRead.scss';
import toast, { Toaster } from 'react-hot-toast';

export default function AddToRead({books}) {
    const { currentUser } = useAuth()

    function entryHandler(){
        const payLoad = books
        axios.post(`https://bookgram-d5394-default-rtdb.firebaseio.com/users/${currentUser.uid}.json`, payLoad)
        .then((response)=>{
            console.log("userdata",response);
            if(response){
                return toast.success("Added to your list. Lets go read", {
                    style: {
                      border: '1px solid #fff',
                      padding: '16px',
                      color: '#060221',
                    },
                    iconTheme: {
                      primary: '#cfcbe6',
                      secondary: '#FFFAEE',
                    },
                  })
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    return (
        <div>
            <button className="button__addtoread" onClick={entryHandler}>Add to Read</button>
            <Toaster/>      
        </div>
    )
}
