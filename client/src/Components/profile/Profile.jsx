import React, { useState, useEffect } from 'react'
import Sidebar from '../Home/Sidebar';
import Follow from '../Home/Follow';
import { BiArrowBack } from "react-icons/bi"
import { BsCalendarWeek } from "react-icons/bs"
import { api } from '../const'
import axios from 'axios'
import Cookies from 'js-cookie'

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState('timeline');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };


    return (
        <div className='flex justify-center w-full bg-black text-white'>
            <div className="grid grid-cols-10 w-5/6 gap-10 bg-black">
                {/* Left Navbar */}
                <div className="col-span-2 h-screen sticky top-0  text-white p-4 ">
                    <Sidebar />
                </div>

                {/* Middle Section */}
                <div className="col-span-5  p-4 overflow-y-auto">
                    {/* Toggle Buttons */}
                    <div className='flex'>
                        <BiArrowBack className="text-3xl cursor-pointer" onClick={() => window.history.back()} />
                        <div className='pl-5'>
                            <p className='font-bold text-white'>Sanskar</p>
                            <p className='font-light text-gray-500'> 24 posts </p>
                        </div>
                    </div>
                    <div>

                        <div id="info">
                            <p className='font-bold text-white text-lg'>Sanskar</p>
                            <p className='font-light text-gray-500'> 24 posts </p>
                            <div className="flex">
                                <BsCalendarWeek />
                                <p className='font-light text-gray-500'> 24 posts </p>
                            </div>
                            <div className="flex">
                                <div className='flex pl-5 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150'>
                                    <span className='pl-2'>4</span>
                                    <p className='font-light text-gray-500'> Following </p>
                                </div>
                                <div className='flex pl-5 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150'>
                                    <span className='pl-2'>4</span>
                                    <p className='font-light text-gray-500'> Following </p>
                                </div>
                            </div>
                            <div className="flex justify-between px-20 mb-4 mt-10 border-b-gray-400 border-b-2">
                                <button
                                    className={`px-10 pt-5 font-bold border-b-4 pb-2  transition-all ease-in-out delay-150 hover:bg-[#181818] ${selectedTab === 'forYou' ? 'border-b-blue-500 text-white' : 'text-[#71767b] border-b-black '
                                        }`}
                                    onClick={() => handleTabChange('forYou')}
                                >
                                    For You
                                </button>
                                <button
                                    className={`mr-4 font-bold text-center px-10 pt-5 pb-2   border-b-4 py-1 delay-150 hover:bg-[#181818] ${selectedTab === 'timeline' ? 'border-b-blue-500 text-white' : ' text-[#71767b] border-b-black'
                                        }`}
                                    onClick={() => handleTabChange('timeline')}
                                >
                                    Following
                                </button>
                            </div>




                        </div>
                    </div>

                </div>

                {/* Right Section (List of Users to Follow) */}
                <div className="col-span-3 p-4">
                    <Follow />
                </div>
            </div>
        </div >
    )
}

export default Profile