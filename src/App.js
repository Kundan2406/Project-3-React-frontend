import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './css/stylesheet.css';

import Menu from './frontend/Welcome/Navigation';
import Chats from './frontend/Chat/chat';
import UserList from './frontend/UserList/userList';
import EditUser from './frontend/UserList/editUser';
import Document from './frontend/Document/document';
import Logout from './frontend/Login/logout';
import Welcome from '../src/frontend/Welcome/welcome';
import Login from '../src/frontend/Login/login';
import Register from './frontend/Register/register';
import LoginSuccess from './frontend/Login/loginSuccess';
import RegisterSuccess from './frontend/Register/registerSuccess';
import NotFound from './frontend/Welcome/notFound';


// Function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Custom route components
const PrivateRoute = ({ children }) => {
  const user = getCookie('user');
  return user ? children : <Navigate to="/welcome" />;
};

const GuestRoute = ({ children }) => {
  const user = getCookie('user');
  return !user ? children : <Navigate to="/users" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PrivateRoute><Menu /></PrivateRoute>}>
          <Route path='/' element={<PrivateRoute><UserList/></PrivateRoute>}/>
          <Route path="chats" element={ <PrivateRoute><Chats /></PrivateRoute> } />
          <Route path="users" element={ <PrivateRoute><UserList /></PrivateRoute> } />
          <Route path="users/:id" element={ <PrivateRoute><EditUser /></PrivateRoute> } />
          <Route path="document" element={ <PrivateRoute><Document /></PrivateRoute> } />
          <Route path="loginsuccess" element={<PrivateRoute><LoginSuccess /></PrivateRoute>} />
        </Route>

        <Route path="logout" element={<Logout />} />
        <Route path="login" element={ <GuestRoute><Login /></GuestRoute>} />
        <Route path="welcome" element={ <GuestRoute><Welcome /></GuestRoute> } />
        <Route path="register" element={ <GuestRoute><Register /></GuestRoute> } />
        <Route path="registersuccess" element={ <GuestRoute><RegisterSuccess /></GuestRoute> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
