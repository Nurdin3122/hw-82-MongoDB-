import React from 'react'
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {deleteTrack, fetchTracks, getTracksOneAlbum, isPublishedTrack, sendTheTrackHistory} from "../TrackThunk.ts";
import {userState} from "../../User/UserSlice.ts";
import {useNavigate} from "react-router-dom";
import {deleteTrackLoading, publishedTrackLoading} from "../TrackSlice.ts"
import Spinner from "../../Spinner/Spinner.tsx";
interface Props {
    id:string;
    name:string;
    length:string;
    number:number;
    isPublished:boolean;
    idAlbum:string;
}

const TrackItem:React.FC<Props> = ({id,name,length,number,isPublished,idAlbum}) => {
    const user = useAppSelector(userState);
    const navigate = useNavigate();
    const dispatch  = useAppDispatch();
    const loadingDelete = useAppSelector(deleteTrackLoading)
    const loadingPublishedTrack = useAppSelector(publishedTrackLoading)


    const onDelete = async  (id:string) => {
        await dispatch(deleteTrack(id));
        await dispatch(fetchTracks());
        navigate("/");
    };

    const SendToTrackHistory = async () => {
        await dispatch(sendTheTrackHistory(id));
    };

    const isPublishedBtn = async (id:string) => {
        await dispatch(isPublishedTrack(id));
        await dispatch(getTracksOneAlbum(idAlbum));
    };
    return (
    <div key={id} className="border m-4">
        <div className="body d-flex align-items-center flex-column">
            {
                loadingPublishedTrack ? (
                    <Spinner/>
                ) : (
                    user && user.role === 'admin' && (
                        <button className="btn btn-close-white"
                                onClick={() => isPublishedBtn(id)}> {isPublished ? "Published" : "Not Published"}</button>
                    )
                )
            }
            <p className="mb-1">{number}</p>
            <p className="mt-2">{name}</p>
            <p>{length}</p>

            <div className="d-flex align-items-center justify-content-center">
                {
                    loadingDelete ? (
                        <Spinner/>
                    ) : (
                        user && user.role === 'admin' && (
                            <button className="btn btn-close" onClick={() => onDelete(id)}></button>
                        )
                    )
                }
                <button className="btn btn-dark" onClick={SendToTrackHistory}>Play</button>
            </div>
        </div>
    </div>
    )
};

export default TrackItem;