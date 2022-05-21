import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import requests from "../utils/requests";
import { useEffect, useState } from "react";

const Movie = () => {
  const [movie, setMovie] = useState("");
  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const result = await fetch(requests.requestDetails(id));
      const data = await result.json();
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  if (movie.success !== false) {
    return (
      <>
        {movie ? (
          <Banner
            css={`
              background-image: url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path ||
              movie?.poster_path});
            `}
          >
            <div className="layer"></div>
          </Banner>
        ) : null}
        <Container>
          <Content>
            <PosterCard>
              {movie ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    movie?.poster_path || movie?.backdrop_path
                  }`}
                  alt={`${movie?.title}`}
                />
              ) : null}
            </PosterCard>
            <Details>
              <h1>{movie?.title}</h1>
              <Genres>
                {movie?.genres?.map((genre, index) => (
                  <div key={index}>{genre.name}</div>
                ))}
              </Genres>
              <Description>{movie?.overview}</Description>
            </Details>
          </Content>
          <div className="trailer">
            Trailer
            <iframe
              src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <Error>
        <h1>404</h1>
        <h2>Page not found</h2>
      </Error>
    );
  }
};

const Banner = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to top, #181818, transparent);
  }
`;

const Container = styled.div`
  margin-top: -165px;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  .trailer {
    display: flex;
    flex-direction: column;
    font-size: 4rem;
    width: 70%;
    align-self: center;
    gap: 2rem;
    font-weight: bold;
    margin-bottom: 4rem;
  }

  iframe {
    aspect-ratio: 16/9;
  }

  @media (max-width: 960px) {
    .trailer {
      font-size: 2.3rem;
    }
`;

const Content = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  height: calc(50vh + 165px);

  @media (max-height: 570px) and (max-width: 700px) {
    & {
      height: 50vh;
    }
  }
`;

const PosterCard = styled.div`
  width: 380px;
  align-self: start;
  border-radius: 2rem;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    display: block;
  }

  @media (max-width: 1100px) {
    & {
      width: 280px;
      align-self: center;
    }
  }

  @media (max-height: 710px) {
    & {
      width: 280px;
    }
  }

  @media (max-width: 940px) {
    & {
      display: none;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-self: center;
  flex-basis: 40%;
  margin-top: -50px;

  h1 {
    font-size: 4.5rem;
  }

  @media (max-width: 1430px) {
    & {
      flex-basis: 60%;
    }
  }
  @media (max-width: 960px) {
    h1 {
      font-size: 3rem;
      text-align: center;
    }

    & {
      flex-basis: 80%;
    }
  }

  @media (max-width: 940px) {
    & {
      align-items: center;
    }
  }

  @media (max-height: 570px) and (max-width: 700px) {
    & {
      align-self: end;
    }
  }
`;
const Genres = styled.div`
  display: flex;
  gap: 2.5rem;
  font-size: 1.4rem;
  flex-wrap: wrap;

  div {
    border: 2px solid white;
    padding: 0.5rem 1.2rem;
    border-radius: 30px;
  }

  @media (max-width: 960px) {
    & {
      font-size: 1.1rem;
      justify-content: center;
    }
  }
`;
const Description = styled.p`
  font-size: 1.5rem;

  @media (max-width: 960px) {
    & {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 940px) {
    & {
      text-align: center;
    }
  }
`;

const Error = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;

  h1 {
    font-size: 12rem;
  }

  h2 {
    font-size: 4rem;
  }
`;

export default Movie;
