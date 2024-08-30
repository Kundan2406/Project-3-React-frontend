import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Welcome() {
    return (
        <>
            <div className="container">
                <div className="main-div text-center">
                    <h2>Welcome to User Module</h2>
                    <p className="mb-3">New User</p>
                    <Link variant="primary" to="/register">
                        <Button>Register</Button>
                    </Link>
                    <p className="mb-3">Existing User</p>
                    <Link variant="primary" to="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Welcome;