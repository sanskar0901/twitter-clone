import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../const';
import Cookies from 'js-cookie';
// import { Navigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import logo from '../../Assets/logo.svg';
// import { BiHomeCircle, BiSearch } from "react-icons/bi";
// import { CiCircleMore } from "react-icons/ci";
// import { BsPerson } from "react-icons/bs";
// import { IoPeopleOutline } from "react-icons/io5";
// import { IoMdLogOut } from "react-icons/io";
// import { TbNotes } from "react-icons/tb";
// import { HiOutlineMail, HiOutlineBell } from "react-icons/hi";
// import { RiTwitterXFill } from "react-icons/ri";
// import { FaUserCircle } from "react-icons/fa"
import Sidebar from './Sidebar';


function Home() {
    const [selectedTab, setSelectedTab] = useState('timeline');
    const token = Cookies.get('token');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        axios.get(`${api}/users/getuser`, {
            headers: {
                "x-auth-token": `${token}`,
            },
        }
        ).then((res) => {
            setUsername(res.data.username);
            setName(res.data.name);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className='flex justify-center w-full bg-black text-white'>
            <div className="grid grid-cols-10 w-5/6 gap-10 bg-black">
                {/* Left Navbar */}
                <div className="col-span-2 h-screen sticky top-0  text-white p-4 ">
                    <Sidebar username={username} name={name} />
                </div>

                {/* Middle Section */}
                <div className="col-span-5  p-4 overflow-y-auto">
                    {/* Toggle Buttons */}
                    <h2 className='font-black text-xl'>Home</h2 >
                    <div className="flex justify-between px-20 mb-4 mt-10">
                        <button
                            className={`px-2 font-bold border-b-4 py-1 ${selectedTab === 'forYou' ? 'border-b-blue-500 text-white' : 'text-[#71767b] border-b-0'
                                }`}
                            onClick={() => handleTabChange('forYou')}
                        >
                            For You
                        </button>
                        <button
                            className={`mr-4 px-2 font-bold text-center   border-b-4 py-1 ${selectedTab === 'timeline' ? 'border-b-blue-500 text-white' : ' text-[#71767b] border-b-0'
                                }`}
                            onClick={() => handleTabChange('timeline')}
                        >
                            Following
                        </button>
                    </div>

                    {/* Content Based on Selected Tab */}
                    {selectedTab === 'timeline' && (
                        <div>
                            {/* Timeline Content */}
                            {/* Replace with your timeline content */}
                        </div>
                    )}

                    {selectedTab === 'forYou' && (
                        <div>
                            {/* For You Content */}
                            {/* Replace with your "For You" content */}
                        </div>
                    )}
                </div>

                {/* Right Section (List of Users to Follow) */}
                <div className="col-span-3 p-4">
                    List of Users to Follow
                    Replace with your list of users to follow
                </div>
            </div>
        </div >
    );
}

export default Home;
