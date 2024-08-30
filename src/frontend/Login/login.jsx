import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            errors: {}
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateForm = () => {
        const { email, password } = this.state;
        let errors = {};
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            errors['email'] = 'Please enter your email.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid.';
        }

        if (!password) {
            formIsValid = false;
            errors['password'] = 'Please enter your password.';
        } else if (password.length <= 7) {
            formIsValid = false;
            errors['password'] = 'Password length should be at least 8 characters.';
        }

        this.setState({ errors });
        return formIsValid;
    }

    LoginSubmit = async (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            const { email, password } = this.state;

            try {
                // Perform login
                const loginResponse = await axios.post('http://localhost:5000/api/login', { email, password });

                // Set cookies for JWT token and user details
                document.cookie = `token=${loginResponse.data.token}; path=/; SameSite=Strict; Secure`;
                document.cookie = `user=${JSON.stringify(loginResponse.data.user)}; path=/; SameSite=Strict; Secure`;

                // Redirect to the success page
                this.setState({ redirect: true });

            } catch (err) {
                console.error(err);
                this.setState({ errors: { message: 'Login failed. Please check your credentials and try again.' } });
            }
        }
    }

    render() {
        const { email, password, errors, redirect } = this.state;

        if (redirect) {
            return <Navigate to="/loginsuccess" />;
        }

        return (
            <div className='container'>
                <div className='form-div'>
                    <h1>Login</h1>
                    <Form noValidate onSubmit={this.LoginSubmit}>
                        <Form.Group className="mb-3" controlId="RegisterEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter Email Id"
                                onChange={this.handleChange}
                            />
                            {errors.email && <p className='error-message'>{errors.email}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="RegisterPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                            />
                            {errors.password && <p className='error-message'>{errors.password}</p>}
                        </Form.Group>

                        <div className='btn-section'>
                            <Button variant="primary" className='text-center' type="submit">
                                Login
                            </Button>
                            <Link to="/welcome" >
                                <Button variant="primary" type="button">
                                    Back
                                </Button>
                            </Link>
                        </div>

                        {errors.message && <p className='error-message'>{errors.message}</p>}
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
