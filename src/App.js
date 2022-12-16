// import logo from './logo.svg';
import './App.css';
import {Home} from './Home'
import {Department} from './Department'
import {Country} from './Country'
import {Employee} from './Employee'
import React, { useState } from 'react';
import {Navigation} from './Navigation';
import {Register} from './Register'; 
import {Routes,Route,useNavigate} from 'react-router-dom';

function App() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();
  function login(){
    
      
    fetch('https://localhost:7098/api/Auth/login',{
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })     // Need to change as per the API
    }).then((response)=>{
        console.log(JSON.stringify())
        response.json().then((result)=>{
            console.log(result);
            localStorage.setItem('login',JSON.stringify({
                isLogin: true,
                token: result.token
            }))
            setisLogin(true);
        })
    })
        console.log('login function is working.');
}

const navigateRegister = ()=>{
  navigate('/register'); 
  
}

  return (
    <>
    {
    !isLogin ? <div className="login">
            <input type="text" onChange={(event)=>{setUsername(event.target.value)}} placeholder='Enter your Username' /> <br />
            <input type="password" onChange={(event)=>{setPassword(event.target.value)}} placeholder='Enter your password' />
          <button onClick={()=>{login()}}>Login</button>
          
          <button onClick={navigateRegister}>register</button>
        </div>
        :
 
    <div>
    <div className="container">
      <h3 className= "m-3 d-flex justify-content-center">
        Employee Management System
      </h3>

      <Navigation/> 

      <Routes>
       <Route exact path='/' element={<Home/>}/>
       <Route path='/department' element={<Department/>}/>
       <Route path='/country' element={<Country/>}/>
       <Route path='/employee' element={<Employee/>}/>
       <Route path='/register' element={<Register/>}/>
      </Routes>
     
      
    </div>
    
    </div>
}
    </>
  );
}

export default App;
