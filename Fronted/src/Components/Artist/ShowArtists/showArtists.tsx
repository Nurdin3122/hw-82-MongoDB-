import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {artistState, loadingState} from "../ArtistSlice.ts";
import Spinner from "../../Spinner/Spinner.tsx";
import {fetchArtists} from "../ArtistThunk.ts";

const ShowArtists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(artistState);
    const loading = useAppSelector(loadingState);


    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);



    return (
        <>
            <h5>Artists</h5>
            {loading ? (
                <Spinner />
            ) : (
                 artists.map(artist => (
                     <div key={artist._id} className="border mt-3 mt-3">
                         <p className="mt-2">Name: {artist.name}</p>
                         <p>description: {artist.description}</p>
                     </div>
                 ))
            )}
        </>
    );
};

export default ShowArtists;