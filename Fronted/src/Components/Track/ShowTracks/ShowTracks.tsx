import React, {useEffect} from 'react';
import Spinner from "../../Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {loadingTrackState, tracksState} from "../TrackSlice.ts";
import {getTracksOneAlbum} from "../TrackThunk.ts";
import TrackItem from "./TrackItem.tsx";
import {useParams} from "react-router-dom";


const ShowTracks = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(loadingTrackState);
    const tracks = useAppSelector(tracksState);

    useEffect(() => {
        dispatch(getTracksOneAlbum(id));
    }, [id]);


    return (
        <div>
            <h5 className="mt-5 text-center">Tracks</h5>
            <div className="d-flex flex-wrap justify-content-center flex-column">
            {loading ? (
                <Spinner/>
            ) : (
                tracks.map(track => (
                   <TrackItem key={track._id}
                              id={track._id}
                              name={track.name}
                              length={track.length}
                              number={track.number}
                   />
                ))
            )}
            </div>
        </div>
    );
};

export default ShowTracks;