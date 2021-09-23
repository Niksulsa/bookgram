import { imageListClasses } from '@mui/material';
import React,{useState} from 'react';
import {storage, db} from '../../firebase';
import firestore from '../../firebase'

export default function ImageUpload({username}) {
    const [image , setImage] =useState(null);
    const [progress, setProgress]=useState(0);
    const [caption,setCaption]= useState('');

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload=()=>{
        const uploadTask= storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress= Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                alert(error.message);
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                    //    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       caption:caption,
                       imageUrl:url,

                    })
                    setProgress(0);
                    setCaption("");
                    setImage(null)
                })
            }
        )

    }
    return (
        <div>
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Review your book" onChange={event=>setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <button onClick={handleUpload}>enter</button>
            
        </div>
    )
}
