import React, {useState} from "react";
import {ArtistMutation} from "../../Type.ts";
import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../../store/hooks.ts";
import {createArtist} from "./ArtistThunk.ts";


const emptyState:ArtistMutation = {
    name:"",
    description:"",
}

const Artists = () => {
    const [newArtist, setNewArtist] = useState<ArtistMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createArtist(newArtist));
            navigate('/showArtists');
        } catch {
            console.log(
                'error'
            );
        }
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArtist((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };


    return (
        <div>
            <h3 className="mt-5">Create your artist</h3>
            <form onSubmit={onSend}>

                <h5 className="mt-5">Name of the Artist</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="name"
                           id="name"
                           onChange={onChange}
                    />
                </div>

                <h5 className="mt-5">Description of the Artist</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="description"
                           id="description"
                           onChange={onChange}
                    />
                </div>


                <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>

            </form>
        </div>
    );
};

export default Artists;