import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { api } from '../const';
import Cookies from 'js-cookie';
import { BsImageFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa"
import Sidebar from './Sidebar';
import Tweets from './Tweets';
import Follow from './Follow';
import Profile from '../profile/Profile';


function Home() {
    const [text, setText] = useState('');
    const [textareaStyle, setTextareaStyle] = useState({});
    const textareaRef = useRef(1);
    const [timeline, setTimeline] = useState([])
    const [tweets, setTweets] = useState([])
    const [selectedTab, setSelectedTab] = useState('forYou');
    const token = Cookies.get("token");
    const [followingUsers, setFollowingUsers] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [isProfileRoute, setIsProfileRoute] = useState(false)

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        axios.get(`${api}/users/getuser`, {
            headers: {
                "x-auth-token": `${Cookies.get("token")}`,
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




    const followUser = (userId) => {
        if (followingUsers.includes(userId)) {
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
                    setFollowingUsers(followingUsers.filter((id) => id !== userId));
                    fetchTimeline()
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
            console.log("file ", selectedFile.name)
        }
    };

    // const handleTweet = () => {
    //     axios.post(`${api}/tweets/create`, {
    //         text
    //     }, {
    //         headers: {
    //             "x-auth-token": `${token}`,
    //         },
    //     }).then((res) => {
    //         console.log(res.data)
    //         setText('')
    //         fetchTweets();
    //     }).catch((err) => {
    //         console.log(err)
    //     }
    //     )
    // }
    const handleTweet = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        axios
            .post('https://api.cloudinary.com/v1_1/dfpztfd9z/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    upload_preset: 'ml_default',
                },
            })
            .then((uploadRes) => {
                const tweetData = {
                    text,
                    imgurl: uploadRes.data.secure_url,
                };
                console.log('Tweet data:', tweetData);

                axios
                    .post(`${api}/tweets/create`, tweetData, {
                        headers: {
                            'x-auth-token': token,
                        },
                    })
                    .then((tweetRes) => {
                        // console.log('Tweet created:', tweetRes.data);
                        setText('');
                        setSelectedFile('');
                        fetchTweets();
                    })
                    .catch((tweetErr) => {
                        console.error('Error creating tweet:', tweetErr);
                    });
            })
            .catch((uploadErr) => {
                console.error('Error uploading file:', uploadErr);
            });
    };
    useEffect(() => {
        fetchTweets()
        fetchTimeline()
    }, [])

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };



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
    const fileInputRef = useRef(null);


    return (
        <div className='flex justify-center w-full bg-black text-white'>
            <div className="grid grid-cols-10 w-5/6 gap-10 bg-black">
                <div className="col-span-2 h-screen sticky top-0  text-white p-4 ">
                    <Sidebar setIsProfileRoute={setIsProfileRoute} name={name} username={username} />
                </div>

                <div className="col-span-5  p-4 overflow-y-auto border-x-[1px] border-[#2f3336]">
                    {!isProfileRoute ?

                        <>
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
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                        <div className='flex items-center gap-3 justify-center'>
                                            <BsImageFill className='text-blue-400 hover:text-blue-600 text-lg cursor-pointer' onClick={() => fileInputRef.current.click()} />
                                            {selectedFile && <img src={selectedFile ? URL.createObjectURL(selectedFile) : ''} alt="" className='w-24 h-24' />}
                                        </div>
                                        <button className='bg-[#1d9bf0] text-center rounded-full text-md px-5 py-1 ' onClick={(e) => { e.preventDefault(); handleTweet() }}>Post</button>
                                    </div>
                                </div>
                            </div>
                            <Tweets tweets={selectedTab === 'timeline' ? timeline : tweets} />
                        </>

                        :
                        <Profile username={username} name={name} setIsProfileRoute={setIsProfileRoute} />
                    }
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
