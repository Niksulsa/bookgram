//import {imageListClasses} from '@mui/material';
import React, {useState} from 'react';
import {storage, db, auth} from '../../firebase';
import './ImageUpload.scss';


    export default function ImageUpload({username}) {
        const [image, setImage] = useState(null);
        const [progress, setProgress] = useState(0);
        const [caption, setCaption] = useState('');
    
        const handleChange = (e) => {
            if (e.target.files[0]) {
                setImage(e.target.files[0]);
            }
        }
        const handleUpload = () => {
            const uploadTask = storage.ref(`images/${
                image.name
            }`).put(image);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (error) => {
                alert(error.message);
            }, () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    db.collection("posts").add({ //    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        user_id:auth.currentUser.uid
    
                    })
                    setProgress(0);
                    setImage(null);
                })
            })
    
        }
        return (
            <div className="upload">
                <div className="upload__barbox">
                    <progress className="upload__bar"
                        value={progress}
                        max="100"/>
                </div>
                <div className="upload__inputbox">
                    <textarea className="upload__input" type="text" placeholder="Review your book..."
                        onChange={
                            event => setCaption(event.target.value)
                        }/>
                    <div className="upload__filebox">
                        <input className="uplaod__file" type="file"
                            onChange={handleChange}/>
                        <div>
                            <button className="upload__upbutton"
                                onClick={handleUpload}>Upload</button>
                        </div>
    
                    </div>
    
                </div>
    
            </div>
        )
    }