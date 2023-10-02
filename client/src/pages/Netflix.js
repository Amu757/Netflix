import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaPlay } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import TopNav from '../components/TopNav';
import Card from '../components/Card';
import { fetchMovies, getGenres } from '../store';
import SliderContainer from '../components/SliderContainer';


const Netflix = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate();


    const movies = useSelector((state) => state.netflix.movies)
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres())
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "all" }))
        }
    });

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    // console.log(movies);

    return (
        <HeroContainer>
            <div className='hero'>
                <TopNav isScrolled={isScrolled} />
                <img src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg" alt="internet is slow" />

                <div className="container">
                    <div className="title">
                        <h1>Super man</h1>
                        <p>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis soluta tempore id perspiciatis impedit quis! ipsum dolor sit amet consectetur adipisicing elit. Cum illum commodi aliquid ullam, odio earum tenetur corporis fugit repellat, laudantium optio unde </p>
                    </div>
                    <div className="buttons">
                        <button className="playBtn" onClick={() => navigate('/player')}>Play</button>
                        <button className="moreBtn">More</button>
                    </div>
                </div>
            </div>
            {movies ? <SliderContainer movies={movies} /> : <p>Loading...</p>}
        </HeroContainer>
    )
}

const HeroContainer = styled.div`
.hero{
    position: relative;
    .container{
        position: absolute;
        bottom: 1rem;
        .title{
            h1{
                margin-left: 5rem;
                text-transform: uppercase;
                font-size: 73px;
                background: -webkit-linear-gradient(#eee,rgb(128,13,13));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            p{
                margin-bottom: 50px;
                width: 640px;
                margin-left: 5rem;
                font-family: "lexend Deca",dans-serif;
                color: white;
            }
        }
        .buttons{
            display: flex;
            margin: 5rem;
            gap: 2rem;
        }
        .playBtn{
            display: flex;
            align-items: center;
            justify-content: center;
            color: red;
            border-radius: 1rem;
            font-size: 1.4rem;
            gap: 1rem;
            padding: 0.9rem;
            padding-left: 2rem;
            padding-right: 2.4rem;
            border: none;
            cursor: pointer;
        }
        .moreBtn{
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            background-color: black;
            border-radius: 1rem;
            font-size: 1.4rem;
            gap: 1rem;
            padding: 0.9rem;
            padding-left: 2rem;
            padding-right: 2.4rem;
            border: 0.1rem solid white;
            cursor: pointer;
        }
    }
}
.hero>img{
    height: 70vh;
    width: 100vw;
    filter: brightness(40%);
}
`;

export default Netflix