import React from "react";

const LoginSuccess = () => {

        // Function to get cookie by name
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
    
        // Get logged-in user's ID from cookies
        const loggedusername = JSON.parse(getCookie('user')).username;

    return (<>
        <div className="container">
            <div className="main-div">
                <h1>Login Successful</h1>
                <p>Welcome <span>{loggedusername}</span></p>
            </div>
        </div>
    </>);
}

export default LoginSuccess;