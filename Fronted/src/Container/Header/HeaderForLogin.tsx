import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {logout} from "../../Components/User/UserThunk.ts";
import {User} from "../../Type.ts";
import {userState} from "../../Components/User/UserSlice.ts";


const HeaderForLogin = () => {
    const user = useAppSelector(userState)

    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand mb-0 h1">Music</Link>
                <div className="justify-content-end">
                    {user && user.role === 'admin' && (
                            <Link to="/createArtists" className="btn btn-danger me-2">Create Artist</Link>
                    )}

                    <Link to="/AlbumForm" className="btn btn-primary me-2">Create album</Link>
                    <Link to="/TrackForm" className="btn btn-success me-2">Create a track</Link>
                    <Link to="/ShowTracksHistory" className="btn btn-dark me-5">Look at tracks history</Link>
                    <button className="btn btn-close-white" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default HeaderForLogin;