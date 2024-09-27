import React from 'react';
import "./ArtistItem.css";
import {apiURL} from "../../../BaseUrl.ts";
import imageNotAvailable from '../../../assets/images/imageNotAvailab.jpg';
import {useNavigate} from "react-router-dom";



interface Props {
    id:string;
    image:string;
    name:string;
    description:string;
    isPublished:boolean
}

const ArtistItem:React.FC<Props> = ({id,image,name,description,isPublished}) => {
    const navigate = useNavigate();
    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }



    const ShowAlbums = (id:string) => {
        navigate(`/ShowAlbum/${id}`)
    }
    return (
        <div key={id} className="item-artist border m-4" onClick={() => ShowAlbums(id)}>
            <div className="body d-flex align-items-center flex-column">
                <span>{isPublished ? "Published" : "Not Published"}</span>
                <div className="image-card">
                    <img className="img-artist" src={`${cardImage}`} alt={`${name}`}/>
                </div>
                <p className="mt-2">{name}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ArtistItem;