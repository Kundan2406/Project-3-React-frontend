const styles = {
    chatBoxContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '450px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginTop: '20px',
        marginBottom: '40px'
    },
    chatWindow: {
        flex: 1,
        overflowY: 'auto',
        borderBottom: '1px solid #ccc',
        marginBottom: '10px',
    },
    textLeft: {
        textAlign: 'left',
    },
    messages: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        backgroundColor: '#cccccc',
        marginBottom: '4px',
        padding: '5px 10px',
        borderRadius: '10px',        
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    userLabel: {
        display: 'flex',
        fontSize: '30px',
        fontWeight: '600',
        marginBottom: '10px',
    },
    inputField: {
        flex: 1,
        padding: '10px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        marginRight: '5px',
    },
    sendButton: {
        padding: '10px 20px',
        borderRadius: '3px',
        marginLeft: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
};

export default styles;