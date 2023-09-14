// Login.js
import React, { useState } from 'react';
import logo from '../Assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from './const';
import cookie from 'js-cookie';
const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
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
        axios.post(`${api}/users/login`, formData).then((res) => {
            console.log(res);
            cookie.set('token', res.data.token)
            window.location.reload();

        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full flex items-center justify-center gap-48">
                <img src={logo} alt="logo" className="w-[20vw] h-auto" />
                <form className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

                    <div className="mb-4">
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

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Log In
                        </button>
                        <Link to='/register' className='text-blue-500 hover:text-blue-700'>
                            Register
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
