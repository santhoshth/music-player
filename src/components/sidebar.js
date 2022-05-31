import React, { useEffect, useState } from 'react'
import '../styles/sidebar.css';
import SidebarButton from './sidebarButton';
import { MdFavorite } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from 'react-icons/io5';
import apiClient from '../spotify';

function Sidebar() {

    const [image, setImage] = useState("https://i.pinimg.com/originals/d2/06/27/d20627a9444c6dc6cdc2ca628fe56feb.jpg");

    useEffect(() => {
        apiClient.get("me").then(async (response) => {
            await setImage(response.data.images[0].url)
        }).catch(error => console.log(error))
    }, [])

    return (
        <div className="sidebar-container">
            <img src={image} className="profile-img" alt="profile-img" />
            <div>
                <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
                <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
                <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
            </div>
            <SidebarButton title="SignOut" to="/login" icon={<FaSignOutAlt />} />
        </div>


    )
}

export default Sidebar