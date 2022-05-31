import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../numberFormat';
import apiClient from '../spotify'
import '../styles/library.css'

function Library() {

    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState(null);
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        apiClient.get('me/playlists').then((response) => {
            setPlaylists(response.data.items)
        }).catch(error => {
            window.localStorage.removeItem("token")
        })

    }, [token])

    const playPlaylist = (id) => {
        navigate('/player', { state: { id: id } })
    }


    return (
        <div className="screen-container">
            <div className="library-body">
                {playlists?.map((playlist) =>
                    <div className="playlist-card" key={playlist?.id} onClick={() => playPlaylist(playlist?.id)}>
                        <img
                            src={playlist?.images[0]?.url}
                            alt="playlist-Art"
                            className="playlist-image" />
                        <p className="playlist-title">{playlist?.name}</p>
                        <p className="playlist-subTitle">{numberFormat(playlist?.tracks?.total)} songs</p>
                        <div className="playlist-fade">
                            <IconContext.Provider value={{ size: "50px", color: "#f57230" }} >
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Library