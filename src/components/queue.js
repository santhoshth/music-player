import React from 'react'
import { timeFormat } from '../numberFormat'
import '../styles/queue.css'

function Queue({ tracks, setCurrentIndex }) {

    return (
        <div className="queue-container flex">
            <div className="queue flex">
                <p className="upnext">Up Next</p>
                <div className="queue-list">
                    {
                        tracks?.map((track, index) =>
                            <div key={index} className="queue-item flex" onClick={() => setCurrentIndex(index)}>
                                <p className="track-name">{track?.track?.name}</p>
                                <p className="track-duration">{timeFormat(track?.track?.duration_ms)}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Queue