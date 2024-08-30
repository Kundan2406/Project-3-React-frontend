import React, { useState, useEffect } from 'react';
import Modal from '../Modal/modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const DocumentManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [documents, setDocuments] = useState([]);

    console.log(documents);

    // Function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Get logged-in user's ID from cookies
    const userid = JSON.parse(getCookie('user')).id;

    console.log(userid);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = (actionType, doc = '') => {
        setAction(actionType);
        setSelectedDoc(doc);
        setShowModal(true);
    };

    const handleUpload = async ({ filelabel, file }) => {
        if (filelabel === '') {
            alert("Please enter File Description");
            return;
        } else if (!file) {
            alert("Please select a file before uploading.");
            return;
        } else {

            const formData = new FormData();
            formData.append('file', file.name);
            formData.append('filelabel', filelabel);
            formData.append('userid', userid); // Make sure this is not null or undefined

            // console.log("Form Data:", filename); // This should log the user ID correctly
            // console.log("Form label:", filelabel); // This should log the user ID correctly
            // console.log("Form userid:", userid); // This should log the user ID correctly

            const filename = file.name;
            console.log(filename);

            try {
                // await axios.post('http://localhost:5000/uploads', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                // });
                await axios.post('http://localhost:5000/uploads', { filelabel, filename, userid });
                fetchDocuments(); // Refresh the list after upload
            } catch (err) {
                console.error('Error uploading file:', err);
            }

            handleClose();
        }
    };

    const handleEdit = async ({ filelabel }) => {

        console.log(selectedDoc.id);
        if (filelabel === '') {
            alert("File Description cannot be blank");
            return;
        } else {
            try {
                await axios.put(`http://localhost:5000/uploads/${selectedDoc.id}`, { filelabel });
                fetchDocuments(); // Refresh the list after edit
            } catch (err) {
                console.error('Error updating document:', err);
            }
            handleClose();
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/uploads/${selectedDoc.id}`);
            fetchDocuments(); // Refresh the list after delete
        } catch (err) {
            console.error('Error deleting document:', err);
        }
        handleClose();
    };

    const handleAction = (data) => {
        if (action === 'upload') {
            handleUpload(data);
        } else if (action === 'edit') {
            handleEdit(data);
        } else if (action === 'delete') {
            handleDelete();
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/uploads', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            });
            setDocuments(response.data);
            // console.log(response.data);
        } catch (err) {
            console.error('Error fetching documents:', err);
        }
    };

    // const fetchUserData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/users', {
    //             headers: {
    //                 'Authorization': `Bearer ${Cookies.get('authToken')}`
    //             }
    //         });
    //         setLoginInfo(response.data);
    //     } catch (err) {
    //         console.error('Error fetching user data:', err);
    //     }
    // };

    useEffect(() => {
        // fetchUserData();
        fetchDocuments();
    }, []);

    // Filter the documents based on logged-in user
    const filteredDocs = documents.filter((data) => data.userid === userid);

    return (
        <>
            <div className='container'>
                <div className='main-div'>
                    <h1>Document Lists</h1>

                    <Button variant="primary" onClick={() => handleShow('upload')} style={{ maxWidth: '200px', marginBottom: '20px' }}>
                        Upload Document
                    </Button>

                    <table className="table table-striped table-hover text-center table-div">
                        <thead>
                            <tr>
                                <th>file Label</th>
                                <th>File Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredDocs.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.filelabel}</td>
                                        <td>{item.filename}</td>
                                        <td>
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleShow('edit', item)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleShow('delete', item)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <Modal
                        show={showModal}
                        handleClose={handleClose}
                        action={action}
                        docData={selectedDoc}
                        handleAction={handleAction}
                    />
                </div>
            </div>
        </>
    );
};

export default DocumentManager;
