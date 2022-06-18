import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const MovieCard = ({ movie, backup }) => {
  const { user } = UserAuth();
  const userId = doc(db, "users", `${user?.email}`);

  const saveMovie = async () => {
    if (user?.email) {
      await updateDoc(userId, {
        savedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  return (
    <SliderWrapper key={movie?.id}>
      <div className="add-favorite" onClick={saveMovie}>
        <FontAwesomeIcon icon={faPlus} color="white" size="2x" />
      </div>
      <Link to={`/movie/${movie?.id}`}>
        <div className="layer">
          <p>{movie?.title || movie?.name}</p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || backup
          }`}
          alt={movie?.title}
          loading="lazy"
        />
      </Link>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  width: 280px;
  padding: 0 1rem;
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
    left: 1rem;
    background: rgba(0, 0, 0, 0.8);
    width: calc(100% - 2rem);
    height: 100%;
    display: none;
  }

  .add-favorite {
    position: absolute;
    top: 1rem;
    left: 2rem;
    z-index: 200;
    display: none;

    svg {
      transition: transform 150ms ease;
    }
  }

  .add-favorite:hover {
    svg {
      transform: rotate(90deg);
    }

    &::after {
      display: initial;
    }
  }

  .add-favorite::after {
    content: "Add to favorite";
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

  &:hover {
    .layer,
    .add-favorite {
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

  @media (max-width: 850px) {
    & {
      width: 200px;
    }
  }

  @media (max-width: 600px) {
    .add-favorite,
    .layer {
      display: initial;
    }

    .layer {
      background: rgba(0, 0, 0, 0.5);
    }

    p {
      font-size: 1.3rem;
    }
  }
`;

export default MovieCard;
