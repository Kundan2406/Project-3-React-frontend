import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {

    return (<>
        <div className="container">
            <div className="main-div">
                <h1>Register Successful</h1>
                <p>Thank you for your Registration.</p>
                <Link variant="primary" to="/login" >
                    <Button variant="primary" type="button" style={{ maxWidth: "200px" }}>
                        Click here to Login.
                    </Button>
                </Link>
            </div>
        </div>
    </>);
}

export default RegisterSuccess;