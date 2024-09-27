import React from 'react'
import {useAppDispatch} from "../../../store/hooks.ts";
import {sendTheTrackHistory} from "../TrackThunk.ts";

interface Props {
    id:string;
    name:string;
    length:string;
    number:number;
    isPublished:boolean;
}

const TrackItem:React.FC<Props> = ({id,name,length,number,isPublished}) => {
    const dispatch  = useAppDispatch();
    const SendToTrackHistory = async () => {
        await dispatch(sendTheTrackHistory(id));
    }
    return (
    <div key={id} className="border m-4">
        <div className="body d-flex align-items-center flex-column">
            <span>{isPublished ? "Published" : "Not Published"}</span>
            <p className="mb-1">{number}</p>
            <p className="mt-2">{name}</p>
            <p>{length}</p>
            <button className="btn btn-dark" onClick={SendToTrackHistory}>Play</button>
        </div>
    </div>
    )
};

export default TrackItem;