import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from './library';
import Player from './player';
import Favorites from './favorites';
import '../styles/home.css';
import Sidebar from '../components/sidebar';
import Login from './login';

function Home() {
    return (
        <Router>
            <div className="main-body">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<><Sidebar /><Library /></>} />
                    <Route path="/player" element={<><Sidebar /><Player /></>} />
                    <Route path="/favorites" element={<><Sidebar /><Favorites /></>} />
                    <Route path="*" element={<h1> 404. Page not Found</h1>} />
                </Routes>
            </div>
        </Router>
    )
}

export default Home