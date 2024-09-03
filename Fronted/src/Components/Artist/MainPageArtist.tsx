import React from 'react';
import {Link} from "react-router-dom";

const MainPageArtist = () => {
    return (
        <div>
            <Link to="/showArtists" className="btn btn-danger me-5">Show Artists</Link>
            <Link to="/createArtists" className="btn btn-danger">Create Artist</Link>
        </div>
    );
};

export default MainPageArtist;