import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({user, handleLogout}) => {
    return (
        <nav className="navbar">
            <h1 className="logo"> <Link to="/main">XLO</Link></h1>
                {user!==""? (
                    <div>
                        <div className="navbarLinks">
                            <Link  to="/dashboard">Dashboard</Link>
                        </div>
                        <Link to="/" onClick={() => handleLogout()} className="loginLink">Logout</Link>
                    </div>
                    ):(<Link to="/login" className="loginLink">Login</Link>)}
        </nav>
    )
}

export default Navbar
