import React from 'react'
import '../styles/albumInfo.css'

function AlbumInfo({ album }) {
    let artists = [];
    album?.artists?.forEach((artist) => {
        artists.push(artist?.name)
    })

    return (
        <div className="albumInfo-card">
            <div className="albumInfo-container">
                <div className="marquee">
                    <p>{album?.name + " - " + artists?.join(", ")}</p>
                </div>
            </div>
            <div className="album-info">
                <p>{`${album?.name} is ${album?.album_type} by ${artists?.join(", ")} with ${album?.total_tracks} track(s)`}</p>
            </div>
            <div className="album-release">
                <p>Release Date: {album?.release_date}</p>
            </div>
        </div>
    )
}

export default AlbumInfo