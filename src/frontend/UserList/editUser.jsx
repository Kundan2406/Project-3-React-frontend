import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {

    const location = useLocation();
    const { userid } = location.state || {};
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorname, setNameErrors] = useState('');
    const [errorEmail, setEmailErrors] = useState('');

    // Function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Get logged-in user's ID from cookies
    const loggedInUserId = JSON.parse(getCookie('user')).id;

    useEffect(() => {
        const fetchUserById = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                const userData = response.data;
                setUsername(userData[0].username);
                setEmail(userData[0].email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (userid) {
            fetchUserById(userid);
        }
    }, [userid]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const EditSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;

        if (username === '') {
            formIsValid = false;
            setNameErrors('Username cannot be blank');
        } else if (email === '') {
            formIsValid = false;
            setEmailErrors('Email cannot be blank');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            setEmailErrors('Invalid Email');
        } else {
            if (formIsValid) {
                try {
                    await axios.put(`http://localhost:5000/users/${userid}`, {
                        username,
                        email,
                    });
    
                    alert('User information updated successfully!');
                    navigate('/users');
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            }
        }
    };

    return (
        <div className="container">
            <div className="main-div">
                <h1>Edit User Information</h1>

                <Form noValidate onSubmit={EditSubmit}>
                    <Form.Group className="mb-3" controlId="RegisterUsername">
                        <Form.Label>Edit Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            defaultValue={username}
                            placeholder="Enter User name"
                            onChange={handleUsernameChange}
                        />
                        <p className='error-message'>{errorname}</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RegisterEmail">
                        <Form.Label>Edit Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            defaultValue={email}
                            placeholder="Enter Email Id"
                            onChange={handleEmailChange}
                            disabled={userid === loggedInUserId} // Disable if the IDs match
                        />
                        <p className='error-message'>{errorEmail}</p>
                    </Form.Group>

                    <div className='btn-section'>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                        <Link to="/users">
                            <Button variant="primary" type="button">
                                Back
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditUser;
