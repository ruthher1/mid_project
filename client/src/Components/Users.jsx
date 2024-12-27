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
import User from "./User"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';


const Users=()=>{
const [usersData,setUsersData]=useState([])
const searchRef=useRef(null)
const [newArr,setNewArr]=useState([...usersData])
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


const [alertOpen, setAlertOpen] = useState(false); 

  const handleShowAlert = () => {
    setAlertOpen(true);  
    setTimeout(() => setAlertOpen(false), 3000);  
  };

const getData=async()=>{
   try
    {
    const res= await axios.get('http://localhost:2000/api/users/getUsers')
    if(res.status===200)
    {
      setUsersData(res.data.sort((a, b) => a._id - b._id))
      setNewArr(res.data.sort((a, b) => a._id - b._id))
    }
    }
    catch(error){
        console.error(error)
    }
  
}

const addUser=async(newUser)=>{
    try{
      console.log("Adding user:", newUser);
      const res = await axios.post('http://localhost:2000/api/users/addUser',newUser)
      if(res.status===200)
        {
          setUsersData(res.data.sort((a, b) => a._id - b._id))
          setNewArr(res.data.sort((a, b) => a._id - b._id))
        }
    }
     catch(e){
        handleShowAlert()
        console.error(e)
     }
}

 const searchUser=(name)=>{
  setNewArr(usersData.filter((user)=>{return user.name.indexOf(name)!=-1 || user.name.indexOf(name)!=-1}))
  // setNewArr((name)?usersData.filter((user)=>{return user.name.indexOf(name)!=-1}):usersData)
}

useEffect(() => {
  getData()
}, [])

return (
    <>

     <React.Fragment>
     <Button  sx={{position:"fixed", cursor:"pointer",bottom:40,left:20,zIndex:1000}} variant="contained" onClick={handleClickOpen}><PersonAddAltSharpIcon fontSize='large' /></Button>
     <TextField  inputRef={searchRef} onKeyUp={()=>searchUser(searchRef.current.value)} sx={{position:"fixed",bottom:40,left:110,zIndex:1000, backgroundColor:"white",'& .MuiInputBase-root': {  backgroundColor: 'white'
    } }} label="Search Box" color="secondary" focused />
     <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const user = Object.fromEntries(formData.entries());
            addUser(user)
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your deatails.
          </DialogContentText>
          <TextField autoFocus required margin="dense" id="name" name="name" label="Full name" type="text" fullWidth  variant="standard"/>
          <TextField  required margin="dense" id="username" name="username" label="User Name" type="text" fullWidth  variant="standard"/>
          <TextField  required margin="dense" id="email" name="email" label="Email" type="email" fullWidth  variant="standard"/>
          <TextField  required margin="dense" id="address" name="address" label="Address" type="text" fullWidth  variant="standard"/>
          <TextField   margin="dense" id="phone" name="phone" label="Phone" type="text" fullWidth  variant="standard"/>
         </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  {alertOpen && <Alert sx={{position:"fixed" ,top:50,left:0}} severity="error">User can not be subscribe</Alert>}
   <Box sx={{ paddingLeft: 11.3 }}>
  {newArr.map(user => ( <><User key={user._id} user={user} setUsersData={setUsersData} setNewArr={setNewArr} /></>))}
  </Box>

    </>
)

}
export default Users