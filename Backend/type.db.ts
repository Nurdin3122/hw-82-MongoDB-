export interface Artist {
    id: string;
    name: string;
    description: string;
    image: string | null;
}

export type ArtistWithoutId = {
    name: string;
    description: string;
    image: string | null;
}