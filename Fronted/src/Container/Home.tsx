import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="mt-5">
            <Link to="/Artists" className="btn btn-primary me-5">Artists</Link>
            <Link to="/MainPageAlbum" className="btn btn-primary me-5">Albums</Link>
            <Link to="/MainPageTrack" className="btn btn-primary me-5">Tracks</Link>
            <Link to="/MainPageUser" className="btn btn-danger">User</Link>
        </div>
    );
};

export default Home;