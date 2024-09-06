import React, {useEffect, useState} from 'react';
import {fetchAlbums} from "../../Album/AlbumThunk.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {TrackMutation} from "../../../Type.ts";
import {useNavigate} from "react-router-dom";
import {albumsState} from "../../Album/AlbumSlice.ts";
import {createTrack} from "../TrackThunk.ts";
const emptyState:TrackMutation = {
    name: "",
    length: "",
    album:"",
}
const TrackForm = () => {
    const [newTrack, setNewTrack] = useState<TrackMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const albums = useAppSelector(albumsState);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewTrack((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };



    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createTrack(newTrack))
            navigate('/ShowTracks');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3 className="mt-5">Create a song</h3>
            <form onSubmit={onSend}>

                <h5 className="mt-5">Name of the song</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="name"
                           id="name"
                           onChange={onChange}
                           value={newTrack.name}
                           required
                    />
                </div>

                <h5 className="mt-5">which length is this track?</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="length"
                           id="length"
                           onChange={onChange}
                           value={newTrack.length}
                           required
                    />
                </div>

                <h5 className="mt-5">Which album is this track?</h5>
                <select className="form-select mt-5"
                        aria-label="Default select example"
                        name="album"
                        value={newTrack.album}
                        onChange={onChange}
                        required>
                    <option value="" disabled>Open this select menu</option>
                    {albums.map(album => (
                        <option key={album._id} value={album._id}>{album.title}</option>
                    ))}
                </select>


                <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>

            </form>
        </div>
    );
};

export default TrackForm;