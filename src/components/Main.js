import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import requests from "../utils/requests";
import CategorySection from "./CategorySection";

const Main = () => {
  const [movies, setMovies] = useState("");
  const movie = movies[Math.floor(Math.random() * movies?.length)];
  const fetchMovie = async () => {
    try {
      const result = await fetch(requests.requestPopular);
      const data = await result.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const truncateString = (str) => {
    if (str?.length > 150) {
      return str.slice(0, 170) + "...";
    } else {
      return str;
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <MainContainer>
      <BannerContainer>
        <div className="layer"></div>
        {movie ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt="text"
          />
        ) : null}

        <InfoContainer>
          <h1>{movie?.title}</h1>
          <ButtonContainer>
            <Link to={`/movie/${movie?.id}`}>Play</Link>
            <button>Watch Later</button>
          </ButtonContainer>
          <p>Released: {movie?.release_date}</p>
          <p>{truncateString(movie?.overview)}</p>
        </InfoContainer>
      </BannerContainer>
      <CategorySection />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  color: white;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 600px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .layer {
    position: absolute;
    width: 100%;
    height: 600px;
    background: linear-gradient(to right, #181818, transparent);
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 20%;
  padding: 4rem;

  h1 {
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 0.9;
  }

  button {
    background: linear-gradient(to left, transparent 50%, white 50%) right;
    background-size: 200%;
    outline: none;
    border: 1px solid white;
    font-size: 1.6rem;
    padding: 1.2rem 2rem;
    color: white;
    cursor: pointer;
    transition: background-position 120ms ease;
  }

  a {
    text-decoration: none;
    color: black;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    padding: 1.2rem 2rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  a:hover {
    background: rgba(255, 255, 255, 1);
  }

  p:first-of-type {
    color: #a3a3a3;
    font-size: 1.5rem;
  }

  p:last-of-type {
    font-size: 1.7rem;
    line-height: 25px;
    padding-top: 1rem;
    max-width: 40%;
  }

  button:last-of-type:hover {
    background-position: left;
    color: black;
  }

  @media (max-width: 1100px) {
    p:last-of-type {
      max-width: 70%;
    }
  }

  @media (max-width: 650px) {
    p:last-of-type {
      max-width: 100%;
    }

    & {
      top: 30%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.8rem;
  margin: 1.6rem 0;
`;

export default Main;
