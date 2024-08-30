
import React, { useState, useEffect } from "react";
import { Link, Outlet, Navigate } from 'react-router-dom';

function Navigation() {

    const [redirect, setRedirect] = useState(false);

    // Function to delete a cookie by name
    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    };

    const handleLogout = (e) => {
        e.preventDefault(); // Prevents the default action of the link which could cause a refresh

        // Delete the cookies related to authentication
        deleteCookie('token');  // Assuming your JWT token is stored in 'token'
        deleteCookie('user');   // Assuming user info is stored in 'user'

        // Trigger redirect after deleting cookies
        setRedirect(true);
    }

    useEffect(() => {
        if (redirect) {
            // Optionally, you can perform additional cleanup or side effects here
        }
    }, [redirect]);

    return (
        <div>
            <div>
                {
                    redirect && (
                        <Navigate to="/logout" />
                    )
                }
            </div>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Dashboard</Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/chats">Group Chats</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Manage Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/document">Documents</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </div>);
}

export default Navigation;