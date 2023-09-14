import React from 'react'
import { FaUserCircle } from "react-icons/fa"
import { FaRetweet, FaRegComment, FaUpload } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { GrFormUpload } from "react-icons/gr";
const Tweets = (tweets) => {
    console.log(tweets);
    return (
        <>
            {tweets.tweets.map((tweet) => {
                return (
                    <div className='flex w-full p-5 border-b-[1px] border-[#2f3336] ' key={tweet._id}>
                        <FaUserCircle className='text-5xl pr-2' />
                        <div className='w-full '>
                            <div className='flex pb-2'>
                                <p>{tweet.author.name}</p>
                                <p className='text-gray-400 pl-2'>@{tweet.author.username}</p>
                            </div>
                            <p>{tweet.text}</p>
                            <div className='flex justify-between pt-2 text-gray-500 '>
                                <div className='flex  pl-5 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150'>
                                    <FaRegComment className=' ease-out hover:color-blue-500' />
                                    <span className='pl-2'>4</span>
                                </div>
                                <div className='flex pl-5 items-center hover:text-[#00ba7c] cursor-pointer transition-all delay-150'>
                                    <FaRetweet className=' ease-out hover:color-blue-500' />
                                    <span className='pl-2'>4</span>
                                </div>
                                <div className='flex pl-5 items-center hover:text-[#f91880] cursor-pointer transition-all delay-150'>
                                    <AiOutlineHeart className=' ease-out hover:color-blue-500' />
                                    <span className='pl-2'>4</span>
                                </div>
                                <div className='flex pl-5 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150'>
                                    <VscGraph className=' ease-out hover:color-blue-500' />
                                    <span className='pl-2'>4</span>
                                </div>

                                <div className='flex pl-5 items-center hover:text-[#187abc] cursor-pointer transition-all delay-150'>
                                    <FaUpload className=' ease-out hover:color-blue-500' />
                                </div>
                            </div>
                        </div>
                    </div >
                )
            })
            }

        </>

    )
}

export default Tweets