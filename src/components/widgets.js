import React, { useEffect, useState } from 'react'
import '../styles/widgets.css'
import apiClient from './../spotify';
import WidgetCard from './widgetCard';

function Widgets({ artistId, setTracks }) {

    const [similar, setSimilar] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [newRelease, setNewRelease] = useState([]);

    useEffect(() => {
        if (artistId) {
            apiClient.get(`/artists/${artistId}/related-artists`)
                .then((res) => {
                    const a = res?.data?.artists?.slice(0, 3);
                    setSimilar(a)
                })
                .catch((err) => console.error(err));
        }

        apiClient.get(`/browse/featured-playlists`)
            .then((res) => {
                const a = res?.data?.playlists?.items?.slice(0, 3);
                setFeatured(a)
            })
            .catch((err) => console.error(err));

        apiClient.get(`/browse/new-releases`)
            .then((res) => {
                const a = res?.data?.albums?.items?.slice(0, 3);
                setNewRelease(a);
            })
            .catch((err) => console.error(err));

    }, [artistId])

    return (
        <div className="widgets-body flex">
            <WidgetCard title="Similar Artists" similar={similar} setTracks={setTracks} />
            <WidgetCard title="Made For You" featured={featured} setTracks={setTracks} />
            <WidgetCard title="New Release" newRelease={newRelease} setTracks={setTracks} />
        </div>
    )
}

export default Widgets