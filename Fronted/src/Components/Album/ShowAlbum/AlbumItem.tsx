import React from 'react';
import imageNotAvailable from '../../../assets/images/imageNotAvailab.jpg';
import {apiURL} from "../../../BaseUrl.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    id:string;
    title:string;
    image:string
    YearOfProduction:string;
}

const AlbumItem:React.FC<Props> = ({id,title,image,YearOfProduction}) => {
    const navigate = useNavigate();
    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }

    const ShowTracks = (id:string) => {
        navigate(`/ShowTracks/${id}`)
    }



    return (
        <div key={id} className="border m-4" onClick={() => ShowTracks(id)} >
            <div className="body d-flex align-items-center flex-column">
                <div className="image-card">
                    <img className="img-artist" src={`${cardImage}`} alt={`${title}`}/>
                </div>
                <p className="mt-2">{title}</p>
                <p>{YearOfProduction}</p>
            </div>
        </div>
    );
};

export default AlbumItem;