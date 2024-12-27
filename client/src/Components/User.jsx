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
import Person from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';


const User = (props) => {
  const [editUser, setEditUser] = React.useState({
    name: props.user.name,
    username: props.user.username,
    email: props.user.email,
    address: props.user.address,
    phone: props.user.phone,
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
  
  const deleteUser = async (id) => {
    console.log("Attempting to delete user:", { id });
    try {
      const res = await axios.delete(`http://localhost:2000/api/users/deleteUser/${id}`);
      if (res.status === 200) {
        props.setUsersData(res.data.sort((a, b) => a._id - b._id))
        props.setNewArr(res.data.sort((a, b) => a._id - b._id))
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const updateUser = async (user) => {
    try {
      const res = await axios.put('http://localhost:2000/api/users/updateUser', user)
      if (res.status === 200) {
        props.setUsersData(res.data);
        props.setNewArr(res.data)
      }
    }
    catch (error) {
      handleShowAlert()
      setEditUser({ ...editUser, username: props.user.username })
      console.error("Error deleting user:", error);
    }
  }


  return (
    <>
      {alertOpen && <Alert sx={{position:"fixed", top:50, left:0}} severity="error">User can not be saved</Alert>}

      <Card  >
        <Paper variant="outlined" elevation={3} >
          <CardContent>
            <Avatar >{props.user.name.split("")[0]}</Avatar>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>user name: {props.user.username}</Typography>
            <Typography variant='h5'>{props.user.name}</Typography>
            <Typography>{props.user.email}</Typography>
            <Typography>{props.user.phone}</Typography>
            <Typography>{props.user.address}</Typography>

          </CardContent>
          <CardActions>
            <Button color={"error"} onClick={() => deleteUser(props.user._id)} variant="outlined" startIcon={<DeleteIcon />}>Delete </Button>
            <React.Fragment>
              <Button color={"success"} onClick={handleClickOpen} variant="outlined" startIcon={<ModeEditOutlineOutlinedIcon />}>Update </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const user = Object.fromEntries(formData.entries());
                    updateUser({ ...user, id: props.user._id })
                    handleClose();
                  },
                }}
              >
                <DialogTitle>Update</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To update your deatails, please change your deatails.
                  </DialogContentText>
                  <TextField autoFocus required margin="dense" id="name" name="name" label="Full name" type="text" fullWidth variant="standard" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                  <TextField required margin="dense" id="name" name="username" label="User Name" type="text" fullWidth variant="standard" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
                  <TextField required margin="dense" id="name" name="email" label="Email" type="email" fullWidth variant="standard" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                  <TextField required margin="dense" id="name" name="address" label="Address" type="text" fullWidth variant="standard" value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} />
                  <TextField margin="dense" id="name" name="phone" label="Phone" type="text" fullWidth variant="standard" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>

          </CardActions>
        </Paper>

      </Card>
      

    </>
  )
}
export default User