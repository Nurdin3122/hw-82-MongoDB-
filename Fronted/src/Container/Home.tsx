import React from 'react';
import {Link} from "react-router-dom";
import ShowArtists from "../Components/Artist/ShowArtists/showArtists.tsx";

const Home = () => {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-center flex-wrap">
                <Link to="/createArtists" className="btn btn-danger me-2">Create Artist</Link>
                <Link to="/AlbumForm" className="btn btn-primary me-2">Create album</Link>
                <Link to="/TrackForm" className="btn btn-success me-5">Create a track</Link>


                <Link to="/CreateUser" className="btn btn-dark me-2">Create a user</Link>
                <Link to="/SaveUser" className="btn btn-dark me-5">Login into my account</Link>
            </div>
            <div className="d-flex justify-content-center">
                <ShowArtists/>
            </div>
        </div>
    );
};

export default Home;