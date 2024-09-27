export interface Artist {
    id: string;
    name: string;
    description: string;
    image: string | null;
    isPublished:boolean;

}

export type ArtistWithoutId = {
    name: string;
    description: string;
    image: string | null;
}

export interface Album {
    id: string;
    title: string;
    YearOfProduction: number;
    image: string | null;
    artist:string
    isPublished:boolean;
}

export type AlbumWithoutId = {
    title: string;
    YearOfProduction: number;
    image: string | null;
    artist:string
}

export type TrackMutation = {
    name: string;
    length: string;
    album:string
    number:number;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}