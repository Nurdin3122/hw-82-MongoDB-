import React, {useState} from "react";
import {ArtistMutation} from "../../Type.ts";
import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../../store/hooks.ts";
import {createArtist} from "./ArtistThunk.ts";
import FromFiles from "../FormFiles/FromFiles.tsx";


const emptyState:ArtistMutation = {
    name:"",
    description:"",
    image:null
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
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArtist((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewArtist(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    return (
        <div className="d-flex flex-column">
            <h3 className="mt-5 d-flex justify-content-center">Create your artist</h3>
            <form onSubmit={onSend}>

                <h5 className="mt-5 d-flex justify-content-center">Name of the Artist</h5>
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

                <h5 className="mt-5 d-flex justify-content-center">Description of the Artist</h5>
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
                <h5 className="mt-5 d-flex justify-content-center">Image</h5>
                <div className="mt-5 d-flex justify-content-center">
                    <div className="col-12 col-sm-6">
                        <FromFiles
                            name="image"
                            onChange={fileInputChangeHandler}
                        />
                    </div>
                </div>


                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>
                </div>


            </form>
        </div>
    );
};

export default Artists;