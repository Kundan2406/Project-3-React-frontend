import React, { useState, useEffect } from 'react';
import styles from './chatstyle';
import axios from 'axios';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chats');
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB'); // Format: YYYY-MM-DD
        const formattedTime = date.toLocaleTimeString('en-GB', { hour12: false }); // Format: HH:mm:ss
        return `${formattedDate} ${formattedTime}`;
    };

    // Function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Get user details from cookies
    const user = JSON.parse(getCookie('user'));
    const userId = user.id;
    const username = user.username;

    const handleSendMessage = async () => {
        if (input.trim() === '') {
            alert("Please enter a message before sending.");
            return;
        }

        const newMessage = {
            id: Number(new Date()),
            userid: userId,
            username: username,
            message: input
        };

        try {
            const response = await axios.post('http://localhost:5000/chats', newMessage);
            setMessages([...messages, response.data]);
            setInput('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const refreshChatlist = async () => {
        fetchMessages();
    };

    return (
        <div className='container'>
            <div className='main-div'>
                <h1>Chat Lists</h1>
                <div style={styles.chatBoxContainer}>
                    <div style={styles.chatWindow}>
                        {messages.map((message, index) => (
                            <div key={index} style={styles.messages}>
                                <div style={styles.textLeft}><b>{message.username}</b><br />
                                    <span>{message.message}</span>
                                </div>
                                <div style={styles.textRight}>[{formatDate(message.time)}]</div>
                            </div>
                        ))}
                    </div>

                    <label style={styles.userLabel}> User : {username} </label>
                    <div style={styles.inputContainer}>

                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                            style={styles.inputField}
                        />
                        <button onClick={handleSendMessage} style={styles.sendButton}>
                            Send
                        </button>
                        <button onClick={refreshChatlist} style={styles.sendButton}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
