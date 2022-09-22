import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Account = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const userRef = doc(db, "users", `${user?.email}`);
  const removeMovie = async (id) => {
    try {
      const filtered = movies.filter((movie) => movie.id !== id);
      await updateDoc(userRef, {
        savedMovies: filtered,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <h1>My List</h1>
      <Movies>
        {movies.map((movie) => {
          return (
            <MovieCard key={`${movie?.id}`}>
              <div className="remove" onClick={() => removeMovie(movie.id)}>
                <FontAwesomeIcon icon={faPlus} color="white" size="2x" />
              </div>
              <Link to={`/movie/${movie?.id}`}>
                <div className="layer">
                  <p>{movie?.title}</p>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie?.img}`}
                  alt={movie?.title}
                />
              </Link>
            </MovieCard>
          );
        })}
      </Movies>
    </Container>
  );
};

const Container = styled.div`
  padding: 10rem 4rem 0 4rem;

  h1 {
    color: white;
    font-size: 3rem;
    padding-bottom: 3rem;
  }

  @media (max-width: 550px) {
    & {
      padding: 18rem 2rem 0 2rem;
    }
  }
`;
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4rem;

  &:empty {
    &::before {
      content: "Your collection list is empty.";
      display: block;
      color: white;
      font-size: 2rem;
    }
  }

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
export default Account;
