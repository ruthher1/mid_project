import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState,useRef } from "react"
import axios from 'axios'
import Todo from "./Todo"
import Grid from '@mui/material/Grid2';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';
import { Alert } from '@mui/material';


const Todos=()=>{
const [todosData,setTodosData]=useState([])
const searchRef=useRef(null)
const [newArr,setNewArr]=useState([...todosData])
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

const getData=async()=>{
   try
    {
    const res= await axios.get('http://localhost:2000/api/todos/getTodos')
    if(res.status===200)
    {
      setTodosData(res.data.sort((a, b) => a._id - b._id))
      setNewArr(res.data.sort((a, b) => a._id - b._id))
    }
    }
    catch(error){
        console.error(error)
    }
  
}

const addTodo=async(newTodo)=>{
    try{
      const res = await axios.post('http://localhost:2000/api/todos/addTodo',newTodo)
      if(res.status===200)
        {
          setTodosData(res.data.sort((a, b) => a._id - b._id))
          setNewArr(res.data.sort((a, b) => a._id - b._id))
        }
    }
     catch(e){
      handleShowAlert()
        console.error(e)
     }
}

 const searchTodo=(title)=>{
  setNewArr(todosData.filter((todo)=>{return todo.title.indexOf(title)!=-1}))
}

useEffect(() => {
  getData()
}, [])

return (
    <>
     <React.Fragment>
     <Button sx={{position:"fixed", cursor:"pointer",bottom:40,left:20,zIndex:1000}} variant="contained" onClick={handleClickOpen} ><AddTaskSharpIcon fontSize='large'/></Button>
      <TextField  inputRef={searchRef} onKeyUp={()=>searchTodo(searchRef.current.value)} sx={{position:"fixed",bottom:40,left:110,zIndex:1000, backgroundColor:"white",'& .MuiInputBase-root': {  backgroundColor: 'white'
         } }} label="Search Box" color="secondary" focused />
     
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const todo = Object.fromEntries(formData.entries());
            addTodo(todo)
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a task, please enter your task.
          </DialogContentText>
          <TextField autoFocus required margin="dense" id="title" name="title" label="Title" type="text" fullWidth  variant="standard"/>
          <TextField  required margin="dense" id="tags" name="tags" label="Tags" type="text" fullWidth  variant="standard"/>
         </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Task</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    

        {alertOpen && <Alert sx={{position:"fixed" ,top:50}} severity="error">Task can not be subscribe</Alert>}
    <Grid container spacing={2} sx={{ paddingLeft: 11.3 }}>  
        {newArr.map(todo => ( <> <Grid size={3}> <Todo  key={todo._id} todo={todo} setTodosData={setTodosData} setNewArr={setNewArr}/> </Grid> </>))}
    </Grid> 
   </>
)

}
export default Todos