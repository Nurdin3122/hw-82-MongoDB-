import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {loadingTrackState, tracksState} from "../TrackSlice.ts";
import {getTracksOneAlbum} from "../TrackThunk.ts";
import Spinner from "../../Spinner/Spinner.tsx";
import TrackItem from "./TrackItem.tsx";


interface Props {
    id:string;
}

const ShowTracksForUser:React.FC<Props> = ({id}) => {
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
                                   isPublished={track.isPublished}
                                   idAlbum={track.album._id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowTracksForUser;