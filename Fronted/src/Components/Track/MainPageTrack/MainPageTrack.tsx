import React from 'react';
import {Link} from "react-router-dom";

const MainPageTrack = () => {
    return (
        <div className="mt-5">
            <Link to="/ShowTracks" className="btn btn-danger me-5">Show Tracks</Link>
            <Link to="/TrackForm" className="btn btn-danger">Create a track</Link>
        </div>
    );
};

export default MainPageTrack;