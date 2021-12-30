import {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = ({handleLogin}) => {
    let history = useHistory();

    const [username, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();
        if(!username){
            alert("Login cannot be empty");
            return;
        }

        if(!password){
            alert("password cannot be empty");
            return;


        }

        
    axios.post("http://localhost:8080/login?password="+password+"&username="+username,{ withCredentials: true}).then(res => {
        console.log(res);
        setLogin("");
        setPassword("");
        setError("");
        handleLogin(username,res.data.accessToken);
        history.push("/main");

      }).catch(error => {
          console.log(error)
          setError("Incorrect username or password!");
      });


    }
    return (
        <div className="formtemp">
            <form onSubmit={onSubmit}>
            {error!==""? <h3 className="error">{error}</h3>:""}
            <label htmlFor="username">Username: </label><br></br>
            <input type="text" id="username" value={username} onChange={(e) => setLogin(e.target.value)} ></input><br></br>
            <label htmlFor="password">Password: </label><br></br>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} ></input><br></br>
            <input type="submit" value="Login"></input>
            </form>
            <p>or</p>
            <Link to="/register"><input type="submit" value="Create an account"></input></Link>
        </div>
    )
}

export default Login
