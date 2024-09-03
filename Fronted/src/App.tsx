
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Container/Header.tsx";
import Home from "./Container/Home.tsx";
import MainPageArtist from "./Components/Artist/MainPageArtist.tsx";
import Artists from "./Components/Artist/Artists.tsx";
import ShowArtists from "./Components/Artist/ShowArtists/showArtists.tsx";

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
                    <Route path="*" element={<h3>There is not such page!</h3>}/>
                </Routes>
            </main>
        </>
    )};





export default App
