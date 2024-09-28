import React, {useEffect, useState} from 'react';
import {AlbumMutation} from "../../../Type.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {createAlbum} from "../AlbumThunk.ts";
import {fetchArtists} from "../../Artist/ArtistThunk.ts";
import {artistState} from "../../Artist/ArtistSlice.ts";
import FromFiles from "../../FormFiles/FromFiles.tsx";



const emptyState:AlbumMutation = {
    title: "",
    YearOfProduction: "",
    image:"",
    artist:"",
}

const AlbumForm = () => {
    const [newAlbum, setNewAlbum] = useState<AlbumMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artists = useAppSelector(artistState);


    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);


    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewAlbum((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewAlbum(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createAlbum(newAlbum))
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex flex-column">
            <h3 className="mt-5">Create an Album</h3>
            <form onSubmit={onSend}>

                <h5 className="mt-5 d-flex justify-content-center">Name of the Album</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="title"
                           id="title"
                           onChange={onChange}
                           value={newAlbum.title}
                           required
                    />
                </div>

                <h5 className="mt-5 d-flex justify-content-center">year of the production of the Album</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="YearOfProduction"
                           id="YearOfProduction"
                           onChange={onChange}
                           value={newAlbum.YearOfProduction}
                           required
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


                <h5 className="mt-5 d-flex justify-content-center">Name of the Artist</h5>
                <select className="form-select mt-5"
                        aria-label="Default select example"
                        name="artist"
                        value={newAlbum.artist}
                        onChange={onChange}
                        required>
                    <option value="" disabled>Open this select menu</option>
                    {artists.map(artist => (
                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                    ))}
                </select>


                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>
                </div>


            </form>
        </div>
    );
};

export default AlbumForm;