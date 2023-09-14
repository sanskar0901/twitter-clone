import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { api } from '../const';
import Cookies from 'js-cookie';
// import { Navigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import logo from '../../Assets/logo.svg';
// import { BiHomeCircle, BiSearch } from "react-icons/bi";
// import { CiCircleMore } from "react-icons/ci";
import { BsPerson, BsImageFill } from "react-icons/bs";
// import { IoPeopleOutline } from "react-icons/io5";
// import { IoMdLogOut } from "react-icons/io";
// import { TbNotes } from "react-icons/tb";
// import { HiOutlineMail, HiOutlineBell } from "react-icons/hi";
// import { RiTwitterXFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa"
import Sidebar from './Sidebar';
import Tweets from './Tweets';
import Follow from './Follow';


function Home() {
    const [text, setText] = useState('');
    const [textareaStyle, setTextareaStyle] = useState({});
    const textareaRef = useRef(1);
    const [timeline, setTimeline] = useState([])
    const [tweets, setTweets] = useState([])
    const [selectedTab, setSelectedTab] = useState('forYou');
    const token = Cookies.get("token");
    const [followingUsers, setFollowingUsers] = useState([]);



    const followUser = (userId) => {
        if (followingUsers.includes(userId)) {
            // If the user is already following, it's an unfollow action
            axios
                .post(
                    `${api}/users/unfollow/${userId}`,
                    {},
                    {
                        headers: {
                            'x-auth-token': token,
                        },
                    }
                )
                .then((res) => {
                    // Remove the user from the list of following users
                    setFollowingUsers(followingUsers.filter((id) => id !== userId));
                    fetchTimeline()
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // If the user is not following, it's a follow action
            axios
                .post(
                    `${api}/users/follow/${userId}`,
                    {},
                    {
                        headers: {
                            'x-auth-token': token,
                        },
                    }
                )
                .then((res) => {
                    // Add the user to the list of following users
                    setFollowingUsers([...followingUsers, userId]);
                    fetchTimeline();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };




    const fetchTweets = () => {
        axios
            .get(`${api}/tweets/all`, {
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((res) => {
                setTweets(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchTimeline = () => {
        axios
            .get(`${api}/tweets/timeline`, {
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((res) => {
                setTimeline(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };



    const handleTweet = () => {
        axios.post(`${api}/tweets/create`, {
            text
        }, {
            headers: {
                "x-auth-token": `${token}`,
            },
        }).then((res) => {
            console.log(res.data)
            setText('')
            fetchTweets();
        }).catch((err) => {
            console.log(err)
        }
        )
    }
    useEffect(() => {
        fetchTweets()
        fetchTimeline()
    }, [])

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    //


    useEffect(() => {
        setTextareaStyle({ height: '3em' });
    }, []);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            const numLines = (textarea.value.match(/\n/g) || []).length + 1;

            const newHeight = numLines * 20;
            setTextareaStyle({ height: `${newHeight}px` });
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
        adjustTextareaHeight();
    };



    return (
        <div className='flex justify-center w-full bg-black text-white'>
            <div className="grid grid-cols-10 w-5/6 gap-10 bg-black">
                <div className="col-span-2 h-screen sticky top-0  text-white p-4 ">
                    <Sidebar />
                </div>

                <div className="col-span-5  p-4 overflow-y-auto">
                    <h2 className='font-black text-xl'>Home</h2 >
                    <div className="flex justify-between px-20 mb-4 mt-10 border-b-gray-400 border-b-2">
                        <button
                            className={`mr-4 font-bold text-center px-10 pt-5 pb-2  border-b-4 py-1 delay-150 hover:bg-[#181818] ${selectedTab === 'forYou' ? 'border-b-blue-500 text-white' : 'text-[#71767b] border-b-black '
                                }`}
                            onClick={() => handleTabChange('forYou')}
                        >
                            For You
                        </button>
                        <button
                            className={`mr-4 font-bold text-center px-10 pt-5 pb-2  border-b-4 py-1 delay-150 hover:bg-[#181818] ${selectedTab === 'timeline' ? 'border-b-blue-500 text-white' : ' text-[#71767b] border-b-black'
                                } `}
                            onClick={() => handleTabChange('timeline')}
                        >
                            Timeline
                        </button>
                    </div>
                    <div className='flex w-full border-b-[1px] border-[#2f3336]'>
                        <FaUserCircle className='text-5xl ' />
                        <div className='w-full'>
                            <textarea
                                ref={textareaRef}
                                style={textareaStyle}
                                value={text}
                                onChange={handleChange}
                                name="input" className='p-2 outline-none bg-black w-full text-white capitalize' placeholder='What is happening?!'
                            />
                            <div className='flex p-5 justify-between items-center '>
                                <BsImageFill className='text-blue-400 hover:text-blue-600 text-lg' />
                                <button className='bg-[#1d9bf0] text-center rounded-full text-md px-5 py-1 ' onClick={(e) => { e.preventDefault(); handleTweet() }}>Post</button>
                            </div>
                        </div>
                    </div>
                    <Tweets tweets={selectedTab === 'timeline' ? timeline : tweets} />

                </div>

                {/* Right Section (List of Users to Follow) */}
                <div className="col-span-3 p-4">
                    <Follow followingUsers={followingUsers} setFollowingUsers={setFollowingUsers} followUser={followUser} />
                </div>
            </div>
        </div >
    );
}

export default Home;
