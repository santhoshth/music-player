import React from 'react'
// import { IconContext } from 'react-icons'
// import { FiChevronRight } from 'react-icons/fi'
import { numberFormat } from '../numberFormat'
import '../styles/widgetCard.css'
import WidgetEntry from './widgetEntry'

function WidgetCard({ title, similar, featured, newRelease }) {
    return (
        <div className='widgetcard-body'>
            <p className="widget-title">{title}</p>
            <div className='widget-items'>
                {
                    similar ? similar?.map(artist => (
                        <WidgetEntry
                            key={artist?.id}
                            title={artist?.name}
                            subtitle={numberFormat(artist?.followers?.total) + " Followers"}
                            image={artist?.images[2]?.url}
                        />
                    )) : featured ? featured?.map(playlist => (
                        <WidgetEntry
                            key={playlist?.id}
                            title={playlist?.name}
                            subtitle={numberFormat(playlist?.tracks?.total) + " Songs"}
                            image={playlist?.images[0]?.url}
                        />
                    )) : newRelease ? newRelease?.map(album => (
                        <WidgetEntry
                            key={album?.id}
                            title={album?.name}
                            subtitle={album?.artists[0]?.name}
                            image={album?.images[2]?.url}
                        />
                    )) : null
                }
                {/* <div className="widget-fade">
                    <div className="fade-button">
                        <IconContext.Provider value={{ size: "20px", color: "#c4d0e3" }} >
                            <FiChevronRight />
                        </IconContext.Provider>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default WidgetCard