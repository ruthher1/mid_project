import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert } from '@mui/material';

const Todo = (props) => {
  const [color, setColor] = React.useState(props.todo.completed === false ? "disabled" : "success")
 
  const [editTodo, setEditTodo] = React.useState({
    title: props.todo.title,
    tags: props.todo.tags,
  })

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

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:2000/api/todos/deleteTodo/${id}`);
      if (res.status === 200) {
        props.setTodosData(res.data.sort((a, b) => a._id - b._id))
        props.setNewArr(res.data.sort((a, b) => a._id - b._id))
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  const updateTodo = async (todo) => {
    try {
      const res = await axios.put('http://localhost:2000/api/todos/updateTodo', todo)
      if (res.status === 200) {
        props.setTodosData(res.data);
        props.setNewArr(res.data)
      }
    } catch (error) {
      handleShowAlert()
      setEditTodo({ ...editTodo, title: props.todo.title })
      console.error("Error deleting todo:", error);
    }
  }
  const completeTodo = () => {

    if (props.todo.completed === false) {
      updateTodo({...props.todo, completed: true, id: props.todo._id })
      setColor("success")
    }
    else {
      updateTodo({ ...props.todo, completed: false, id: props.todo._id })
      setColor("disabled")
    }

  }

  return (
    <>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant='h6'>{props.todo.title}</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{props.todo.tags.map((tag)=>{return `${tag}, `})}</Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">More Details</Button> */}
          <DeleteIcon sx={{ cursor: "pointer" }} fontSize="large" color={"error"} onClick={() => deleteTodo(props.todo._id)} />
          <CheckCircleIcon sx={{ cursor: "pointer" }} fontSize="large" color={color} onClick={() => completeTodo(props.todo._id)} />
          <React.Fragment>
            <ModeEditOutlineOutlinedIcon sx={{ cursor: "pointer"}} color={"info"}  fontSize="large" variant="outlined" onClick={handleClickOpen}> </ModeEditOutlineOutlinedIcon>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const todo = Object.fromEntries(formData.entries());
                  updateTodo({ ...todo, id: props.todo._id })
                  handleClose();
                },
              }}
            >
              <DialogTitle>Update</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To update your task, please change your task.
                </DialogContentText>
                <TextField autoFocus required margin="dense" id="title" name="title" label="Title" type="text" fullWidth variant="standard" value={editTodo.title} onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })} />
                <TextField required margin="dense" id="tags" name="tags" label="Tags" type="text" fullWidth variant="standard" value={editTodo.tags} onChange={(e) => setEditTodo({ ...editTodo, tags: e.target.value })} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>

        </CardActions>
      </Card>
      {alertOpen && <Alert sx={{position:"fixed" , top:50,left:0}} severity="error">Task can not be saved</Alert>}


    </>
  )
}
export default Todo