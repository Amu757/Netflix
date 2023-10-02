import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"

import Player from "./pages/Player"
import TvShow from "./pages/TvShow"
import MoviePage from "./pages/MoviePage"
import Netflix from "./pages/Netflix"
import ErrorPage from "./pages/ErrorPage"
import BackgroundImage from './components/BackgroundImage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TvShow />} />
        <Route exact path="/movie" element={<MoviePage />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
