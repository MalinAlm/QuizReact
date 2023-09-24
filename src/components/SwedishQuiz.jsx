import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from "prop-types";

// STYLED COMPONENTS
const ContainerDiv = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;
const QuestionDiv = styled.div`
  background-color: #e8fbf0;

  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  border-radius: 5px;
`;
const AnswerDiv = styled.div`
  background-color: #e8fbf0;

  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const Heading1 = styled.h1`
  font-size: 40px;
`;

// parts of code from: https://reactgo.com/react-change-button-color-onclick/ and: https://styled-components.com/docs/basics#passed-props
const AnswerButtons = styled.button`
  background-color: ${(props) =>
    props.clicked ? (props.correct ? '#b5ff85' : '#ff7777') : 'defaultColor'};
`;

function SwedishQuiz() {
  const [sweQuiz, setSweQuiz] = useState(null);
  const [point, setPoint] = useState(0);
  const [answerDone, setAnswerDone] = useState([]);
  //FÖLJANDE RAD HÖR TILL KNAPP SOM SKIFTAR I FÄRG BEROENDE PÅ SVAR
  const [clickedButtons, setClickedButtons] = useState([]);

  useEffect(() => {
    fetch('/quiz.json')
      .then((response) => response.json())
      .then((result) => {
        const shuffledQuiz = result.swedishQuiz.map((quiz) => {
          const shuffleArray = (arrayContent) => {
            const theShuffledArray = [...arrayContent];
            // following line of code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            theShuffledArray.sort(() => Math.random() - 0.5);
            return theShuffledArray;
          };
          return {
            ...quiz,
            questionsInterior: {
              ...quiz.questionsInterior,
              shuffledValues: shuffleArray([
                quiz.questionsInterior.correctAnswer,
                ...quiz.questionsInterior.answers,
              ]),
            },
          };
        });
        setSweQuiz(shuffledQuiz);
        console.log(result.swedishQuiz, 'Fetch is here');
      });
  }, []);

  return (
    <>
      <ContainerDiv>
        <Heading1>Inrednings-Quiz</Heading1>
        {sweQuiz && (
          <ul>
            {sweQuiz.map((quiz) => (
              <li key={quiz.id}>
                <QuestionDiv>
                  {' '}
                  <div>
                    <p>{quiz.questionsInterior.question}</p>
                  </div>
                  <AnswerDiv>
                    {quiz.questionsInterior.shuffledValues.map((value) => (
                      // <label key={value}>

                      <AnswerButtons
                        className="quizButton"
                        key={value}
                        // GÖR KNAPPARNA DISABLED NÄR MAN GJORT SITT VAL
                        disabled={answerDone.includes(quiz.id)}
                        onClick={() => {
                          setAnswerDone((earlierState) => [
                            ...earlierState,
                            quiz.id,
                          ]);
                          setClickedButtons([...clickedButtons, value]);
                          // GER 1 POÄNG OM MAN SVARAR RÄTT PÅ FRÅGAN
                          quiz.questionsInterior.correctAnswer === value
                            ? (setPoint(point + 1), console.log('one point'))
                            : (setPoint(point + 0),
                              console.log('better luck next time'));
                        }}
                        name={quiz.id}
                        //KNAPP BLIR RÖD OM FEL OCH GRÖN OM RÄTT SVAR
                        // parts of code from: https://reactgo.com/react-change-button-color-onclick/ and: https://styled-components.com/docs/basics#passed-props
                        style={{
                          backgroundColor: clickedButtons.includes(value)
                            ? quiz.questionsInterior.correctAnswer === value
                              ? '#b5ff85'
                              : '#ff7777'
                            : ' ',
                        }}
                        // type="button"
                      >
                        {value}
                      </AnswerButtons>
                    ))}
                  </AnswerDiv>
                  {/* <p>RÄTT SVAR:{quiz.questionsInterior.correctAnswer}</p> */}
                </QuestionDiv>
              </li>
            ))}
          </ul>
        )}
      </ContainerDiv>
      <ContainerDiv>
        <p>Total points:</p>
        {point}
      </ContainerDiv>
    </>
  );
}

export default SwedishQuiz;
