import React from 'react';
import {useAppSelector} from "../../../store/hooks.ts";
import {useParams} from "react-router-dom";
import {userState} from "../../User/UserSlice.ts";
import ShowTracksForUser from "./ShowTracksForUser.tsx";
import ShowTracksForAnon from "./ShowTracksForAnon.tsx";


const ShowTracks = () => {
    const {id}:string = useParams();
    const user = useAppSelector(userState);

    return (
        <>
            {user ? (
                <ShowTracksForUser id={id}/>
            ) : (
                <ShowTracksForAnon/>
            )}
        </>
    );
};

export default ShowTracks;