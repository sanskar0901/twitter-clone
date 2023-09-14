import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { api } from '../const';

const Follow = () => {
    const token = Cookies.get('token');
    const [username, setUsername] = useState('');
    useEffect(() => {
        axios.get(`${api}/users/getuser`, {
            headers: {
                "x-auth-token": `${Cookies.get("token")}`,
            },
        }
        ).then((res) => {
            setUsername(res.data.username);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${api}/users/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of users that the current user is following
        axios
            .get(`${api}/users/following`, {
                headers: {
                    'x-auth-token': token,
                },
            })
            .then((res) => {
                setFollowingUsers(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

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
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="w-full rounded-lg p-2 bg-gray-900 text-white sticky">
            <p className="font-black m-2 text-lg">Who to follow</p>
            {users.map((user) => {
                // Check if the current user is already following this user
                const isFollowing = followingUsers.includes(user._id);
                return (
                    user.username != username &&
                    <div className="flex justify-between items-center p-4 hover:bg-[#181818]" key={user._id}>
                        <FaUserCircle className="text-4xl" />
                        <div>
                            <p className="font-bold">{user.name}</p>
                            <p className="text-gray-200 font-light text-sm">{user.username}</p>
                        </div>
                        <button
                            className={`${isFollowing ? 'bg-gray-900 text-white border-white border-2' : 'bg-[#ffffff] font-bold text-center text-black'
                                } rounded-full text-md px-5 py-1`}
                            onClick={(e) => {
                                e.preventDefault();
                                followUser(user._id)
                            }}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Follow;
