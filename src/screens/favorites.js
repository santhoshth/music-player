import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../spotify'
import '../styles/favorites.css';
import { timeFormat } from '../numberFormat'
import moment from 'moment';

function Favorites() {

    const navigate = useNavigate();
    const [userTracks, setUserTracks] = useState([]);
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        apiClient.get(`/me/tracks?limit=50`)
            .then(async (res) => {
                setUserTracks(res.data.items)
            }).catch(err => console.log(err))
    }, [token])

    const playTrack = (track) => {
        navigate('/player', { state: { fav: track } })
    }

    const getArtists = (artists) => {
        let artistsName = [];
        artists?.forEach((artist) => {
            artistsName.push(artist?.name)
        })
        return artistsName.join(', ');
    }

    return (
        <div className="screen-container">
            <div className="fav-container flex">
                <div className="fav flex">
                    <p className="fav-title">Liked Songs</p>
                    <div className="fav-heading flex">
                        <div className="fav-entry-body flex">Title</div>
                        <p className="fav-track-album flex">Album</p>
                        <p className="fav-track-date flex">Date Added</p>
                        <p className="fav-track-duration flex">Duration</p>
                    </div>
                    <div className="fav-list">

                        {
                            userTracks?.map((track, index) =>
                                <div key={index} className="fav-item flex" onClick={() => playTrack(track)}>
                                    <div className="fav-entry-body flex">
                                        <img src={track?.track?.album?.images[1]?.url} alt="title" className="fav-entry-image" />
                                        <div className="fav-entry-right-body flex">
                                            <p className="fav-entry-title">{track?.track?.name}</p>
                                            <p className="fav-entry-subtitle">{getArtists(track?.track?.artists)}</p>
                                        </div>
                                    </div>
                                    <p className="fav-track-album flex">{track?.track?.album?.name}</p>
                                    <p className="fav-track-date flex">{moment(track?.added_at).format('MMM DD, YYYY')}</p>
                                    <p className="fav-track-duration flex">{timeFormat(track?.track?.duration_ms)}</p>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites