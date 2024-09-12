import React from 'react';
import "./ArtistItem.css";
import {apiURL} from "../../../BaseUrl.ts";
import imageNotAvailable from '../../../assets/images/imageNotAvailab.jpg';



interface Props {
    id:string;
    image:string;
    name:string;
    description:string;
}

const ArtistItem:React.FC<Props> = ({id,image,name,description}) => {
    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/images" + "/" + image;
    }
    return (
        <div key={id} className="item-artist border me-auto ms-auto mt-4 mb-4 d-flex flex-column align-items-center">
            <div className="body d-flex align-items-center flex-column">
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