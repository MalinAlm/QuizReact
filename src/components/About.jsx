import NewsLetterForm from './NewsLetterForm';
import styled from 'styled-components';
// USE CNTEXT
// import { useContext } from 'react';
// import SomeContext from './SomeContext';

const ContainerDivAbout = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  width: 60%;
  margin-left: 20%;
  text-align: center;
`;
function About() {
  return (
    <>
      <ContainerDivAbout>
        <h1>Abuot</h1>
        <p>
          Meet Quiztofer, your go-to brain teaser! Unleash your inner whiz with
          our tantalizing array of quizzes available in English and Swedish.
          Challenge your knowledge on a variety of topics, from science trivia
          to historical happenings, and everything in between! Whether your are
          brushing up on facts or learning something new, Quiztofer makes
          brain-boosting a breeze. Chlimb the leaderboard, and show off your
          smarts in two languages. Make every moment a learning adventure with
          Quiztofer, because life is more fun when you are quizzed in!
        </p>
      </ContainerDivAbout>
      <div>
        <NewsLetterForm />
      </div>
    </>
  );
}

export default About;
