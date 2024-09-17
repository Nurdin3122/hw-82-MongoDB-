import React from 'react';
import ShowArtists from "../Components/Artist/ShowArtists/showArtists.tsx";

const Home = () => {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-center flex-wrap">

            </div>
            <div className="d-flex justify-content-center">
                <ShowArtists/>
            </div>
        </div>
    );
};

export default Home;