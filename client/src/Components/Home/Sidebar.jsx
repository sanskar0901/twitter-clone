import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.svg';
import { BiHomeCircle, BiSearch } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { TbNotes } from "react-icons/tb";
import { HiOutlineMail, HiOutlineBell } from "react-icons/hi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa"
const Sidebar = ({ username, name }) => {
    return (
        <>
            <img src={logo} alt="Logo" className='mb-3 ' />
            <ul className="text-xl align mb-3">
                <li className=" flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <BiHomeCircle className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold">Home</Link>
                </li>
                <li className=" flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <BiSearch className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold  ">Explore</Link>
                </li>
                <li className=" flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <HiOutlineBell className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold">Notifications</Link>
                </li>
                <li className=" flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <HiOutlineMail className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold">Messages</Link>
                </li>
                <li className=" flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <TbNotes className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold">Lists</Link>
                </li>
                <li className="flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <IoPeopleOutline className='text-xl' />
                    <Link to="#" className="block pl-4 font-bold">Communities</Link>
                </li>
                <li className="flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <RiTwitterXFill className='text-xl' />
                    <Link to="#" className="block pl-4 font-bold">Verified</Link>
                </li>
                <li className="flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <BsPerson className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold">Profile</Link>
                </li>
                <li className=" flex items-center rounded-full hover:pl-4 transition-all ease-in-out delay-150  py-2 hover:bg-[#181818]">
                    <CiCircleMore className='text-xl ' />
                    <Link to="#" className="block pl-4 font-bold">More</Link>
                </li>
            </ul>
            <button className='bg-[#1d9bf0] text-center rounded-full text-xl px-20 py-2 mb-5'>Post</button>
            <div className=' flex items-center justify-center px-2 py-2 rounded-full hover:bg-[#181818] gap-3'>
                <FaUserCircle className='text-4xl' />
                <div className='w-[7vw]'>
                    <p className=''>{name}</p>
                    <span className='text-[#71767b] font-light'>@{username}</span>
                </div>
                <IoMdLogOut className='cursor-pointer' />


            </div>
        </>
    )
}

export default Sidebar