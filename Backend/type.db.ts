export interface Artist {
    id: string;
    name: string;
    description: string;

}

export type ArtistWithoutId = {
    name: string;
    description: string;
}

export interface Album {
    id: string;
    title: string;
    YearOfProduction: string;
    artist:string

}

export type AlbumWithoutId = {
    title: string;
    YearOfProduction: string;
    artist:string
}