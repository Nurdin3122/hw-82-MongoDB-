import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {logout} from "../../Components/User/UserThunk.ts";
import {userState} from "../../Components/User/UserSlice.ts";
import logoForAnnonUser from "../../assets/images/logoForAnnonUser.jpg";
import {apiURL} from "../../BaseUrl.ts";


const HeaderForLogin = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userState)
    const handleLogout = () => {
        dispatch(logout());
    };
    let cardImage = logoForAnnonUser
    if (user.image) {
        cardImage = apiURL + "/" + user.image;
    }

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1">Music</Link>
                <div className="justify-content-center">
                    <Link to="/createArtists" className="btn btn-danger me-2">Create Artist</Link>
                    <Link to="/AlbumForm" className="btn btn-primary me-2">Create album</Link>
                    <Link to="/TrackForm" className="btn btn-success me-2">Create a track</Link>
                    <Link to="/ShowTracksHistory" className="btn btn-dark me-5">Look at tracks history</Link>

                </div>
                <div className="d-flex align-items-center">
                    <p style={{margin: 0, padding: 0, display: "inline-block", verticalAlign: "middle"}}>
                        Hello: {user.displayName ? user.displayName : user.username}
                    </p>
                    <div className="ms-3">
                        <img style={{height: "50px", width: "50px"}} src={`${cardImage}`} alt={user.displayName}/>
                    </div>
                    <button className="btn btn-close-white" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default HeaderForLogin;