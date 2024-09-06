import React, {useEffect} from 'react';
import Spinner from "../../Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {loadingTrackState, tracksState} from "../TrackSlice.ts";
import {fetchTracks} from "../TrackThunk.ts";


const ShowTracks = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(loadingTrackState);
    const tracks = useAppSelector(tracksState);

    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);


    return (
        <div>
            <h5>Tracks</h5>
            {loading ? (
                <Spinner/>
            ) : (
                tracks.map(track => (
                    <div key={track._id} className="border mt-3 mt-3">
                        <p className="mt-2">Name: {track.name}</p>
                        <p>year of production: {track.length}</p>
                    </div>
                ))
            )}

        </div>
    );
};

export default ShowTracks;