import React from 'react';
import {Link} from "react-router-dom";

const HeaderForAnnon = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1">Music</Link>
                <div className="justify-content-end">
                    <Link to="/CreateUser" className="btn btn-dark me-2">Sign up</Link>
                    <Link to="/SaveUser" className="btn btn-dark me-5">Sign in</Link>
                </div>
            </div>
        </nav>
    );
};

export default HeaderForAnnon;