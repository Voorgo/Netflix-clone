import styled from "styled-components";
import Row from "./Row";
import requests from "../utils/requests";

const CategorySection = () => {
  return (
    <Section>
      <Row title="Upcoming" id="1" fetchUrl={requests.requestUpcoming} />
      <Row title="Popular" id="2" fetchUrl={requests.requestPopular} />
      <Row title="Trending" id="3" fetchUrl={requests.requestTrending} />
      <Row title="Top Rated" id="4" fetchUrl={requests.requestTopRated} />
      <Row title="Horror" id="5" fetchUrl={requests.requestHorror} />
    </Section>
  );
};

const Section = styled.section`
  padding-bottom: 4rem;
`;

export default CategorySection;
