import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import Image from 'next/image';
import insta from '../../assets/insta.jpg'
import Button from "@mui/material/Button";
import { blue } from '@mui/material/colors';
import Link from "next/link";
import { AuthContext } from "../../context/auth";
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {db, storage} from '../../firebase'
import { SelectUnstyledContext } from '@mui/base';
import { doc, setDoc } from 'firebase/firestore';
function Index() {

  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [file,setFile] = React.useState(null)
  const { signup, user } = React.useContext(AuthContext);


  const handleClick = async () => {
    
    try {
      setLoading(true);
      setError("");
      const user =await signup(email, password); // unique id in user
      console.log("signed in");

      const storageRef = ref(storage,`${user.uid}/profile`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            console.log("File available at", downloadURL);
              let obj={
              name:name,
              email:email,
              uid: user.user.uid,
              photoURL :downloadURL,
              post:[]
              }
            // firestore database
            await setDoc(doc(db,'users',user.user.uid),obj)
            console.log('doc added')
          });
        }
      );
    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError("");
      }, 2000); // after 2 sec remove error
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("user not present");
    }
  }, [user]);


  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={insta} />
        <TextField
          size="small"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          margin="dense"
          fullWidth
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          fullWidth
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Full  Name"
          variant="outlined"
          margin="dense"
          fullWidth
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />

        <Button
          variant="outlined"
          fullWidth
          component="label"
          style={{ marginTop:'1rem'}}
        >
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/>
          Upload
        </Button>

        <Button variant="contained" fullWidth style={{marginTop:'1rem'}} component='span'
        onClick={handleClick} disabled={loading}
        >
          Signup            
        </Button>
      </div>
      <div className='bottom-card'>
          Already have an account ? 
          <Link href='/login'>
          <span style={{color:'blue'}}> login</span>     
            </Link>   
      </div>
    </div>
  );
}

export default Index