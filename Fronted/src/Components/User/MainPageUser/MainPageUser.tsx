import React from 'react';
import {Link} from "react-router-dom";

const MainPageUser = () => {
    return (
            <div className="mt-5">
                <Link to="/CreateUser" className="btn btn-danger me-5">Create a user</Link>
                <Link to="/SaveUser" className="btn btn-danger">Save a user</Link>
            </div>
    );
};

export default MainPageUser;