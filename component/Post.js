import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from '../context/auth';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Post({ postData, userData }) {
  const {user} = useContext(AuthContext);
  cosnt[like,setLike] = useState(false)

  useEffect(()=>{
      if(postData.likes.includes(user.uid)){
          setLike(true)
      }else{
          setLike(false)
      }

  },[postData])
  const handleLike=async()=>{
      if(!like){
          await updateDoc(doc(db,'posts',props.postData.postId),{
              likes:arrayUnion(user.uid)
          })
      }else{
          await updateDoc(doc(db, "posts", props.postData.postId), {
            likes: arrayRemove(user.uid),
          });
      }
  }
 
  return (
    
      <div className="post-container">
        <video src={postData.postUrl} />
        <div className="videos-info">
          <div className="avatar-container">
            <Avatar
              alt="Remy Sharp"
              src={postData.profileUrl}
              sx={{ margin: "0.5rem" }}
            />
            <p style={{ color: "white", fontWeight: "bold" }}>
              {postData.profileName}
            </p>
          </div>
          <div className="post-like">
            <FavoriteIcon
              fontSize="large"
              style={like ? { color: "red" } : { color: "white" }
            }
            onClick={handleLike}
            />
            {postData.likes.length > 0 && postData.likes.length}
          </div>
        </div>
      </div>
  );
}

export default Post