import React from 'react';
import {Link} from "react-router-dom";

const MainPageAlbum = () => {
    return (

            <div className="mt-5">
                <Link to="/ShowAlbum" className="btn btn-danger me-5">Show Albums</Link>
                <Link to="/AlbumForm" className="btn btn-danger">Create Album</Link>
            </div>
    );
};

export default MainPageAlbum;