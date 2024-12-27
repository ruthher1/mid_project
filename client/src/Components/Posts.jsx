import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import Post from "./Post"
import Grid from '@mui/material/Grid2';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Alert } from '@mui/material';

const Posts = () => {
  const [postsData, setPostsData] = useState([])
  const searchRef = useRef(null)
  const [newArr, setNewArr] = useState([...postsData])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const [alertOpen, setAlertOpen] = React.useState(false); 
    
      const handleShowAlert = () => {
        setAlertOpen(true);  
        setTimeout(() => setAlertOpen(false), 3000);  
      };


  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:2000/api/posts/getPosts')
      if (res.status === 200) {
        setPostsData(res.data.sort((a, b) => a._id - b._id))
        setNewArr(res.data.sort((a, b) => a._id - b._id))
      }
    }
    catch (error) {
      console.error(error)
    }

  }
  
  const addPost = async (newPost) => {
    try {
      const res = await axios.post('http://localhost:2000/api/posts/addPost', newPost)
      if (res.status === 200) {
        setPostsData(res.data.sort((a, b) => a._id - b._id))
        setNewArr(res.data.sort((a, b) => a._id - b._id))
      }
    }
    catch (e) {
      handleShowAlert()
      console.error(e)
    }
  }
  
  const searchPost = (title) => {
    setNewArr(postsData.filter((post) => { return post.title.indexOf(title) != -1 }))

  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <React.Fragment>
        <Button sx={{ position: "fixed", cursor: "pointer", bottom: 40, left: 20, zIndex: 1000 }} variant="contained" onClick={handleClickOpen} ><PostAddIcon fontSize='large' /></Button>
        <TextField inputRef={searchRef} onKeyUp={() => searchPost(searchRef.current.value)} sx={{
          position: "fixed", bottom: 40, left: 110, zIndex: 1000, backgroundColor: "white", '& .MuiInputBase-root': {
            backgroundColor: 'white'
          }
        }} label="Search Box" color="secondary" focused />
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const post = Object.fromEntries(formData.entries());
              addPost(post)
              handleClose();
            },
          }}
        >
          <DialogTitle>Add Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a post, please enter your post.
            </DialogContentText>
            <TextField autoFocus required margin="dense" id="title" name="title" label="Title" type="text" fullWidth variant="standard" />
            <TextField required margin="dense" id="body" name="body" label="Body" type="text" fullWidth variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Post</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  {alertOpen && <Alert sx={{position:"fixed" ,top:50, left:0}} severity="error">Post can not be subscribe</Alert>}

      <Grid container spacing={2} sx={{ paddingLeft: 11.4 }}>
          {newArr.map(post => ( <><Grid size={6}><Post key={post._id} post={post} setPostsData={setPostsData} setNewArr={setNewArr} /> </Grid></>))}

      </Grid>
    </>
  )

}
export default Posts