import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LoginSuccess = () => {

    return (<>
        <div className="container">
            <div className="main-div">
                <h1>404 Page not found</h1>
                <p>Please check the url and enter correct URL.</p>

                <Link variant="primary" to="/welcome" >
                    <Button variant="primary" type="button" style={{ maxWidth: "150px" }}>
                        Homepage
                    </Button>
                </Link>
            </div>
        </div>
    </>);
}

export default LoginSuccess;