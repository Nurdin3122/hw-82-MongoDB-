import React from 'react'

interface Props {
    id:string;
    name:string;
    length:string;
    number:number
}

const TrackItem:React.FC<Props> = ({id,name,length,number}) => {
    return (
    <div key={id} className="border m-4">
        <div className="body d-flex align-items-center flex-column">
            <p className="mb-1">{number}</p>
            <p className="mt-2">{name}</p>
            <p>{length}</p>
        </div>
    </div>
)};

export default TrackItem;