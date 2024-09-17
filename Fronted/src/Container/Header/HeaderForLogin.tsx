import React from 'react';
import {Link} from "react-router-dom";
const HeaderForLogin = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand mb-0 h1">Music</Link>
    <div className="justify-content-end">
        <Link to="/createArtists" className="btn btn-danger me-2">Create Artist</Link>
        <Link to="/AlbumForm" className="btn btn-primary me-2">Create album</Link>
        <Link to="/TrackForm" className="btn btn-success me-2">Create a track</Link>
        <Link to="/ShowTracksHistory" className="btn btn-dark me-5">Look at tracks history</Link>
        <Link to="/CreateUser" className="btn btn-dark me-2">Sign up</Link>
        <Link to="/SaveUser" className="btn btn-dark me-5">Sign in</Link>
    </div>
            </div>
         </nav>
    );
};

export default HeaderForLogin;