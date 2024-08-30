import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Logout = () => {

    return (
        <div className="container">
            <div className="main-div">
                <h1>Logout</h1>
                <p className="mb-3">User has been Logged out.</p>
                <Link to="/welcome" >
                    <Button style={{ maxWidth: "200px" }} >Go To Homepage</Button>
                </Link>
            </div>
        </div>
    );
}

export default Logout;
