import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Users from './Users';
import Posts from './Posts';
import Todos from './Todos';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DescriptionIcon from '@mui/icons-material/Description';

const Home=()=>{
 const navigate=useNavigate()


 const [value, setValue] = React.useState(0);
    
   const handleClickUser=()=>{
    navigate('/Users')
   }
   const handleClickPost=()=>{
    navigate('/Posts')
   }
   const handleClickTodo=()=>{
    navigate('/Todos')
   }
   const handleClickHome=()=>{
    navigate('./')
   }
      return (
        <>
          <Box sx={{display: 'flex', position:'fixed', backgroundColor:'#cfd8dc', height:"100%"}}>
          <Tabs 
          orientation="vertical"
          variant="scrollable"
          value={value}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab icon={<HomeIcon/>} label="home" onClick={handleClickHome}/>
            <Tab icon={<PeopleAltIcon/>} label="users" onClick={handleClickUser}/>
            <Tab icon={<TaskAltIcon/>} label="todos" onClick={handleClickTodo}/>
            <Tab icon={<DescriptionIcon/>} label="posts" onClick={handleClickPost}/>

          </Tabs>
        </Box>
        
        <Routes>
        <Route path="/Home" element={<Home />}/>
         <Route path="/Users" element={<Users />}/>
         <Route path="/Posts" element={<Posts/>}/>
         <Route path="/Todos" element={<Todos />}/>   
        </Routes> 
        </>

     
        
      );
 }
     
export default Home





