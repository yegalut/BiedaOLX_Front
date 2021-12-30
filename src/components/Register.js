import {useState} from 'react';
import { useHistory } from "react-router-dom";

import axios from 'axios';


const Register = () => { 

    let history = useHistory();
    const [name, setName] = useState('');
    const [username, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();

        if(!name){
            alert("name cannot be empty");
            return;
        }

        if(!username || username.length < 5){
            alert("Username cannot be empty");
            return;
        }

        if(!password){
            alert("password cannot be empty");
            return;
        }

        if(!repeatPass || repeatPass !== password){
            alert("repeated password is not the same as password");
            return;
        }

        axios.post("http://localhost:8080/api/addUser",{
            name: name,
            password: password,
            username: username
        }, {withCredentials:true}).then(res => {
            console.log(res);
            setName("");
            setLogin("");
            setPassword("");
            setError("");
           
            history.push("/login");

        }).catch(error => {
          console.log(error)
          setError("wrong data");
      });


    }

    
    return (
        <div className="formtemp">
            <form onSubmit={onSubmit}>
            {error!==""? <h3 className="error">{error}</h3>:""}
            <label htmlFor="name">Name: </label><br></br>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} ></input><br></br><br></br>
            <label htmlFor="username">Username: </label><br></br>
            <input type="text" id="username" value={username} onChange={(e) => setLogin(e.target.value)} ></input><br></br><br></br>
            <label htmlFor="password">Password: </label><br></br>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} ></input><br></br>
            <label htmlFor="repeatPassword">Repeat password: </label><br></br>
            <input type="password" id="repeatPassword" value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} ></input><br></br>
            <input type="submit" value="Create Account"></input>
            </form>
        </div>
    )
}

export default Register
