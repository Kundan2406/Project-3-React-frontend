import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/modal';

function UserList() {

    const [Users, updateUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');
    const [selectedId, setSelectedUser] = useState('');
    const navigate = useNavigate();

    // Function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Get logged-in user's ID from cookies
    const loggedInUserId = JSON.parse(getCookie('user')).id;


    useEffect(() => {
        // Fetch users from the backend API
        const fetchUsers = async () => {
            try {
                const token = document.cookie.split('=')[1]; // Assuming JWT token is stored in cookies
                const response = await axios.get('http://localhost:5000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updateUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = (actionType, doc = '') => {
        setAction(actionType);
        setSelectedUser(doc);
        setShowModal(true);
    };

    const handleAction = (data) => {
        if (action === 'delete') {
            handleDelete();
        }
    };

    const handleDelete = async () => {
        try {
            const token = document.cookie.split('=')[1]; // Assuming JWT token is stored in cookies
            await axios.delete(`http://localhost:5000/users/${selectedId.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userslist = Users.filter((user) => user.id !== selectedId.id);
            updateUsers(userslist);
            handleClose();
        } catch (error) {
            console.error("Error deleting user:", error);
        }

        handleClose();
    };

    const handleEditClick = (userid) => {
        navigate(`${userid}`, { state: { userid } });
    };

    return (
        <>
            <div className='container'>
                <div className='main-div'>
                    <h1>User Lists</h1>
                    <table className="table table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Users.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <Button variant="secondary" type="button" onClick={() => handleEditClick(item.id)} style={{ marginLeft: '10px' }}>
                                                Edit
                                            </Button>
                                            {item.id !== loggedInUserId && (
                                                <Button variant="danger" onClick={() => handleShow('delete', item)} style={{ marginLeft: '10px' }}>
                                                    Delete
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                show={showModal}
                handleClose={handleClose}
                action={action}
                docData={setSelectedUser}
                handleAction={handleAction}
            />
        </>
    )
}

export default UserList;