import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import MainSite from './components/MainSite';
import Login from './components/Login'; 
import Messeges from "./components/Messeges"
import UserPosts from './components/UserPosts';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PostSite from './components/PostSite';
import Register from './components/Register';
import Cookies from 'universal-cookie';
import UserDashboard from './components/UserDashboard';

function App() {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState();

  const handleLogin = (username, token) => {
    
      if(token != null && token !== ""){
        const authHeader = "Bearer " + token;
        axios.get("http://localhost:8080/api/getCookie",{
           headers: {
            Authorization: authHeader
           },
           withCredentials: true,
          }).then(res =>{

          setUser(username);
        }).catch(error => {
          console.log(error)
        });
      }

  }

  const fetchUser = () => {
    axios.get("http://localhost:8080/api/getUser", {withCredentials: true})
    .then(res => {
      setUser(res.data.username);
      setUserId(res.data.id)
    })

  }


  useEffect(()=>{
    fetchUser();

  },[])

  const handleLogout= ()=>{
    setUser("");

    axios.get("http://localhost:8080/api/logout", { withCredentials: true}).then(res =>{

        }).catch(error => {
          console.log(error)
        });
  }

  

  return (
    <Router>
      <div className="App">
        <Navbar user={user} handleLogout={handleLogout}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <MainSite/>
            </Route>

             
            <Route exact path="/main/:allParams?">
              <MainSite/>
            </Route>
            <Route exact path="/login">
              <Login handleLogin={handleLogin}/>  
            </Route>
            <Route exact path="/messages">
              <Messeges user={user}/> 
            </Route>
            <Route exact path="/myposts">
              <UserPosts user={user}/> 
            </Route>
            <Route exact path="/post/:id">
              <PostSite user={user}/> 
            </Route>
            <Route exact path="/register">
              <Register user={user}/> 
            </Route>
            <Route exact path="/dashboard">
              <UserDashboard user={user} handleLogout={handleLogout} userId={userId}/> 
            </Route>
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

