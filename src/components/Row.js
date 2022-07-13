import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "./MovieCard";

const Row = ({ title, fetchUrl, id }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const result = await fetch(fetchUrl);
    const data = await result.json();
    setMovies(data.results);
  };

  const slideRight = () => {
    const slider = document.querySelector(`.slider${id}`);
    slider.scrollLeft += 500;
  };

  const slideLeft = () => {
    const slider = document.querySelector(`.slider${id}`);
    slider.scrollLeft -= 500;
  };

  useEffect(() => {
    fetchMovies();
    //eslint-disable-next-line
  }, [fetchUrl]);

  return (
    <Container>
      <Title>{title}</Title>
      <div className="arrows">
        <Arrow onClick={slideLeft} className="arrow">
          <FontAwesomeIcon icon={faAngleLeft} color="black" size="2x" />
        </Arrow>
        <Arrow
          css={`
            left: calc(100% - 1.5rem);
            transform: translate(-100%, -50%);
          `}
          onClick={slideRight}
          className="arrow"
        >
          <FontAwesomeIcon icon={faAngleRight} color="black" size="2x" />
        </Arrow>
        <MoviesContainer className={`slider${id}`}>
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie?.id}
              id={id}
              backup={movies[0]?.backdrop_path}
            />
          ))}
        </MoviesContainer>
      </div>
    </Container>
  );
};

const Title = styled.h2`
  padding: 2rem 4rem;
  font-size: 2rem;
`;
const Container = styled.div`
  .arrows {
    position: relative;
    width: 100%;
  }

  .arrows:hover {
    .arrow {
      display: flex;
    }
  }
`;
const MoviesContainer = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  overflow-y: hidden;
  padding: 0 3rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  width: 100%;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0.5;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  top: 50%;
  left: 1.5rem;
  z-index: 2000;
  transform: translateY(-50%);
  display: none;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 600px) {
    & {
      width: 30px;
      height: 30px;
      display: flex;
    }
  }
`;

export default Row;
