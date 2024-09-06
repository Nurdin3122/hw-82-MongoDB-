
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Container/Header.tsx";
import Home from "./Container/Home.tsx";
import MainPageArtist from "./Components/Artist/MainPageArtist.tsx";
import Artists from "./Components/Artist/Artists.tsx";
import ShowArtists from "./Components/Artist/ShowArtists/showArtists.tsx";
import MainPageAlbum from "./Components/Album/MainPageAlbum/MainPageAlbum.tsx";
import AlbumForm from "./Components/Album/AlbumFrom/AlbumForm.tsx";
import ShowAlbum from "./Components/Album/ShowAlbum/ShowAlbum.tsx";
import MainPageTrack from "./Components/Track/MainPageTrack/MainPageTrack.tsx";
import TrackForm from "./Components/Track/TrackFrom/TrackForm.tsx";
import ShowTracks from "./Components/Track/ShowTracks/ShowTracks.tsx";
import MainPageUser from "./Components/User/MainPageUser/MainPageUser.tsx";
import CreateUser from "./Components/User/CreateUser/CreateUser.tsx";
import SaveUser from "./Components/User/SaveUse/SaveUser.tsx";

const App = () => {

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Artists" element={<MainPageArtist/>}/>
                    <Route path="/createArtists" element={<Artists/>}/>
                    <Route path="/showArtists" element={<ShowArtists/>}/>
                    <Route path="/MainPageAlbum" element={<MainPageAlbum/>}/>
                    <Route path="/AlbumForm" element={<AlbumForm/>}/>
                    <Route path="/ShowAlbum" element={<ShowAlbum/>}/>
                    <Route path="/MainPageTrack" element={<MainPageTrack/>}/>
                    <Route path="/TrackForm" element={<TrackForm/>}/>
                    <Route path="/ShowTracks" element={<ShowTracks/>}/>

                    <Route path="/MainPageUser" element={<MainPageUser/>}/>
                    <Route path="/CreateUser" element={<CreateUser/>}/>
                    <Route path="/SaveUser" element={<SaveUser/>}/>

                    <Route path="*" element={<h3>There is not such page!</h3>}/>
                </Routes>
            </main>
        </>
    )};





export default App
