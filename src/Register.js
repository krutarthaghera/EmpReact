import React, { useState } from 'react';


/*const [username, setUsername] = useState();
const [password, setPassword] = useState();*/

function registeruser (props)
{
    console.log( 'test', props);
}

export function Register(props){
    return(
        <div>
          <input type="text" onChange={(event)=>{this.setState({username:event.target.value})}} placeholder='Enter Username' />  
          <input type="password" onChange={(event)=>{this.setState({password:event.target.value})}} placeholder='Enter Username' />
          <button onClick={registeruser(props)}>Register</button> 
        </div>

    );

}
//export default Register;