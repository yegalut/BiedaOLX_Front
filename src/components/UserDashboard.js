import React from 'react'

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = ({userId, handleLogout}) => {

    let history = useHistory();
    const deleteAccount = () =>{

        if (window.confirm("Do you realy want to delete this post?")) {
            axios.delete("http://localhost:8080/api/deleteUser/"+userId, {withCredentials: true}).then(() => {
                handleLogout();
                
                history.push("/main");

        })
            .catch(err=>{
                console.log(err);
            });

        }else{

        }

    }

    return (
        <div>
            <Link  to="/messages"><h2>Messages</h2></Link>
            <Link  to="/myposts"><h2>My posts</h2></Link>
            <button className="deleteButton" onClick={() => deleteAccount()}>Delete account</button>
        </div>
    )
}

export default UserDashboard
