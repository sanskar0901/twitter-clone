import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import { BsCalendarWeek } from 'react-icons/bs';
import { api } from '../const'
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Profile = ({ username, name, setIsProfileRoute }) => {
    const [UserProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [selectedTab, setSelectedTab] = useState('posts');
    const [joined, setJoined] = useState(null)

    const fetchProfile = (() => {
        axios.get(`${api}/users/profile/${username}`, {
        })
            .then((response) => {
                console.log(response.data)
                setUserProfile(response.data.userProfile);
                setUserPosts(response.data.posts);
                setJoined(response.data.createdAt)
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    })
    useEffect(() => {
        // Fetch user data from the backend API
        fetchProfile();
    }, []);

    const handleEditPost = (() => {

    })
    const handleDeletePost = ((postId) => {
        axios.delete(`${api}/tweets/delete/${postId}`, {
            headers: {
                "x-auth-token": Cookies.get('token')
            }
        }).then((response) => {
            console.log(response.data)
            fetchProfile();

        })
    })

    return (
        <div className="flex flex-col justify-center w-full bg-black text-white">
            <div className="grid  w-full gap-10 bg-black">
                <div className="w-full overflow-y-auto">
                    <div className="flex items-center ">
                        <BiArrowBack className="text-3xl cursor-pointer" onClick={() => { setIsProfileRoute(false) }} />
                        <div className="pl-5">
                            <p className="font-bold text-white">{name}</p>
                            <p className="font-light text-gray-500">{userPosts.length} posts</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://pbs.twimg.com/profile_banners/1401817180979699714/1694785884/1500x500" className='w-full' />
                        <div id="info" className='flex flex-col px-4 pb-4 gap-4'>
                            <div className='bg-black mt-[-2rem] w-[8rem] rounded-full'>

                                <FaUserCircle className='text-[8rem] ' />
                            </div>
                            <div >
                                <p className="font-bold text-white text-lg">{name}</p>
                                <p className="font-light text-gray-500">@{username}</p>

                            </div>
                            <div className="flex gap-2 items-center">
                                <BsCalendarWeek />
                                <p className="font-light text-gray-500">Joined on {new Date(joined).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex gap-2 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150">
                                    {UserProfile && <span className="">{UserProfile.following.length}</span>}
                                    <p className="font-light text-gray-500"> Following </p>
                                </div>
                                <div className="flex gap-2 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150">
                                    {UserProfile && <span className="">{UserProfile.followers.length}</span>}
                                    <p className="font-light text-gray-500"> Followers </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-5 p-4 overflow-y-auto">
                {/* Add tabs to switch between 'posts' and 'following' */}
                <div className="flex justify-center mb-4 border-b-2 border-[#2f3336]">
                    <button
                        className={`mr-4 font-bold text-center px-5 py-2 border-b-4 delay-150 hover:bg-[#181818] ${selectedTab === 'posts' ? 'border-b-blue-500 text-white' : 'text-[#71767b] border-b-black'
                            }`}
                        onClick={() => setSelectedTab('posts')}
                    >
                        Posts
                    </button>
                </div>

                {/* Render user posts or following users based on selected tab */}
                {selectedTab === 'posts' && (
                    <div>
                        {userPosts.map((post) => (
                            <div key={post._id} className='border-b-2 border-[#2f3336]'>
                                {/* Render user posts */}
                                <div className='flex justify-between'>

                                    <div className='flex items-center'>
                                        <FaUserCircle className='text-5xl pr-2' />
                                        <div className='w-full '>
                                            <div className='flex pb-2 flex-col'>
                                                <p>{post.author.name}</p>
                                                <p className='text-gray-400'>@{post.author.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <AiOutlineEdit className="hover:text-blue-500 transition-all delay-150 cursor-pointer ease-out text-lg" onClick={() => handleEditPost(post._id)}>Edit</AiOutlineEdit>
                                        <AiOutlineDelete className="hover:text-red-500 transition-all delay-150 cursor-pointer ease-out text-lg" onClick={() => handleDeletePost(post._id)}>Delete</AiOutlineDelete>
                                    </div>
                                </div>
                                <p className='border-b-2 border-[#2f3336] p-2'>{post.text}</p>
                                <img src={post.imgurl} className='my-4 h-[50vh] rounded-[1rem]' alt="" />


                            </div>
                        ))}
                    </div>
                )}
                {selectedTab === 'following' && (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Profile;
