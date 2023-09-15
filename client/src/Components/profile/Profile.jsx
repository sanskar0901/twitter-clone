import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import { BsCalendarWeek } from 'react-icons/bs';
import { api } from '../const'
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, onEdit, postId, fetchProfile }) => {
    const [editedText, setEditedText] = useState('');

    const handleEdit = () => {
        axios.put(`${api}/tweets/edit/${postId}`, {
            text: editedText
        }, {
            headers: {
                'x-auth-token': `${Cookies.get("token")}`,

            }
        }).then((res) => {
            console.log(res.data)
            fetchProfile();
            setEditedText('');
        }).catch((err) => {
            console.error(err)
        })
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity`}
        >
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-black p-4 rounded shadow-lg z-10">
                <h2 className="text-lg font-semibold mb-4">Edit Text</h2>
                <input
                    type="text"
                    className="w-full border-2 p-2 rounded mb-4 border-blue-600 text-black"
                    placeholder="Enter text..."
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveContent = (newContent) => {
        setEditedContent(newContent);
    };
    return (
        <>

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
                    <div className="flex justify-center mb-4 border-b-2 border-[#2f3336]">
                        <button
                            className={`mr-4 font-bold text-center px-5 py-2 border-b-4 delay-150 hover:bg-[#181818] ${selectedTab === 'posts' ? 'border-b-blue-500 text-white' : 'text-[#71767b] border-b-black'
                                }`}
                            onClick={() => setSelectedTab('posts')}
                        >
                            Posts
                        </button>
                    </div>

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
                                            <AiOutlineEdit onClick={() => handleOpenModal()} className="hover:text-blue-500 transition-all delay-150 cursor-pointer ease-out text-lg">Edit</AiOutlineEdit>
                                            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveContent} postId={post._id} fetchProfile={fetchProfile} />
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
        </>
    );
};

export default Profile;
