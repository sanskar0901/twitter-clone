import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home/Home';

function App() {
  const [token, setToken] = useState(Cookies.get('token'));

  useEffect(() => {
    setToken(Cookies.get('token'));
  }, [Cookies.get('token')]);
  const PRIVATE_ROUTES = [
    {
      path: "/",
      component: <Home />
    },
    // Add other private routes here
  ];

  const PUBLIC_ROUTES = [
    {
      path: "/login",
      component: <Login />
    },
    {
      path: "/register",
      component: <Register />
    }
  ];
  return (


    <div className="App">
      <Router>
        <Routes>
          {token ? (
            PRIVATE_ROUTES.map(route => (
              <Route path={route.path} element={route.component} key={route.path} />
            ))
          ) : (
            PUBLIC_ROUTES.map(route => (
              <Route path={route.path} element={route.component} key={route.path} />
            ))
          )}
          {token && <Route path="*" element={<Navigate to="/" />} />}
          {!token && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </Router>
    </div >
  );
}

export default App;
