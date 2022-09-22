import { useState } from "react";
import styled from "styled-components";
import Row from "../components/Row";
import requests from "../utils/requests";
import { Link } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    try {
      const data = await fetch(requests.requestKeyword(keyword));
      const result = await data.json();
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
    console.log(movies);
  };

  return (
    <>
      <SearchSection>
        <div className="layer"></div>
        <div className="search">
          <h3>Search for movies</h3>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              aria-label="Enter movie name"
              placeholder="Search movies..."
            />
            <button>Search</button>
          </form>
        </div>
      </SearchSection>
      <Results>
        {movies?.length ? (
          <Movies>
            {movies.map((movie) => {
              return (
                <MovieCard key={`${movie?.id}`}>
                  <Link to={`/movie/${movie?.id}`}>
                    <div className="layer">
                      <p>{movie?.title}</p>
                    </div>
                    <img
                      src={
                        movie?.backdrop_path
                          ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
                          : require("../images/na.png")
                      }
                      alt={movie?.title}
                    />
                  </Link>
                </MovieCard>
              );
            })}
          </Movies>
        ) : (
          <Row title="Upcoming" id="1" fetchUrl={requests.requestUpcoming} />
        )}
      </Results>
    </>
  );
};

const SearchSection = styled.div`
  width: 100%;
  height: max-content;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg");
  padding-top: 10rem;
  position: relative;

  .search {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    position: relative;
    z-index: 2;
    padding: 0 3rem;
  }

  h3 {
    color: white;
    font-size: 4rem;
  }

  .layer {
    position: absolute;
    height: 100%;
    inset: 0px;
    background: #000000c4;
    z-index: 1;
  }

  form {
    width: 100%;
    max-width: 60rem;
    display: flex;
    gap: 2rem;

    button {
      width: 100px;
      border: none;
      outline: none;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      background: white;
      color: black;
    }
  }

  input {
    height: 40px;
    width: 100%;
    text-indent: 1rem;
    background: #373737;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;

const Results = styled.section`
  color: white;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4rem;
  padding: 4rem;

  @media (max-width: 1100px) {
    & {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  @media (max-width: 600px) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
const MovieCard = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    display: none;
  }

  &:hover {
    .layer,
    .remove {
      display: initial;
    }
  }

  p {
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: normal;
    text-align: center;
    padding: 0 2rem;
  }

  a {
    color: white;
  }

  .remove {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 200;
    display: none;

    svg {
      transform: rotate(45deg);
    }
  }

  .remove::after {
    content: "Remove";
    position: absolute;
    top: 0;
    left: 100%;
    color: black;
    background: white;
    font-size: 1.3rem;
    padding: 0.3rem 0.6rem;
    margin-left: 1rem;
    border-radius: 2px;
    display: none;
  }

  .remove:hover {
    &::after {
      display: initial;
    }
  }

  @media (max-width: 600px) {
    .remove,
    .layer {
      display: initial;
    }
  }
`;

export default Search;
