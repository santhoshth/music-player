import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AudioPlayer from '../components/audioPlayer';
import Queue from '../components/queue';
import SongCard from '../components/songCard';
import Widgets from '../components/widgets';
import apiClient from '../spotify';
import '../styles/player.css'

function Player() {

    const location = useLocation();
    const navigate = useNavigate();

    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        if (location.state) {
            if (location.state?.id) {
                apiClient.get(`/playlists/${location.state?.id}/tracks`)
                    .then(async (res) => {
                        await setTracks(res.data.items)
                        await setCurrentTrack(res.data.items[0]?.track)
                    }).catch(error => console.log(error))
            } else if (location.state?.fav) {
                apiClient.get(`/artists/${location.state?.fav?.track?.artists[0]?.id}/top-tracks?market=es&limit=20`)
                    .then(async (res) => {
                        let playlist = [];
                        playlist.push({ track: location.state?.fav?.track })
                        await res.data.tracks.map(song => {
                            if (song.preview_url) {
                                playlist.push({ track: song })
                            }
                        })
                        await setTracks(playlist)
                        await setCurrentTrack(location.state?.fav?.track)
                    }).catch(error => console.log(error))
            }
        } else {
            apiClient.get(`/me/playlists/`)
                .then(async (res) => {
                    await apiClient.get(`/playlists/${res.data?.items[0]?.id}/tracks`)
                        .then(async (res) => {
                            await setTracks(res.data.items)
                            await setCurrentTrack(res.data.items[0]?.track)
                        }).catch(error => console.log(error))
                }).catch(error => console.log(error))
        }

    }, [location.state, token])

    useEffect(() => {
        setCurrentTrack(tracks[currentIndex]?.track)
    }, [currentIndex, tracks])

    return (
        <div className="screen-container flex">
            <div className="left-player-body">
                <AudioPlayer
                    currentTrack={currentTrack}
                    total={tracks}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
                <Widgets
                    artistId={currentTrack?.album?.artists[0]?.id}
                    setTracks={setTracks} />
            </div>
            <div className="right-player-body">
                <SongCard album={currentTrack?.album} />
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
            </div>
        </div>
    )
}

export default Player