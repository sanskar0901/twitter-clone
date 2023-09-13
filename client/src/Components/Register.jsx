// Login.js
import React, { useState } from 'react';
import logo from '../Assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from './const';
import cookie from 'js-cookie';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
        cpass: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/users/register`, formData);
            console.log(response);
            cookie.set('token', response.data.token);
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full flex items-center justify-center gap-48">
                <img src={logo} alt="logo" className="w-[20vw] h-auto" />
                <form className="bg-gray-300 shadow-md rounded px-8 py-8 mb-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                            id="cpassword"
                            type="password"
                            name="cpass"
                            value={formData.cpass}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Register;
