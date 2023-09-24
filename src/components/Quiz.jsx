import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { categoriesToId } from '../Helpers/Helper';
import Points from './Points';
import '../css/StyleQuiz.css';

function Quiz() {
  // GÖR KNAPPAR DISABLED VID SVAR 2 RADER
  const [answerDone, setAnswerDone] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [data, setData] = useState(null);
  // TILLHÖR 1+ FÖR RÄTT SVAR
  const [point, setPoint] = useState(0);
  // use Location kollar på uri
  const location = useLocation();
  // konverterar uri till kateori
  const quizType = location.pathname.replace('/quiz/', '').toLowerCase();
  const categoryId = categoriesToId[quizType];
  console.log(quizType, categoryId);

  // code for cleaning strings from : https://javascript.plainenglish.io/here-are-2-javascript-approaches-to-encode-decode-html-entities-52989bb12031
  function cleanWordsFromString(text) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  useEffect(() => {
    // API FROM OPEN TRIVIA DATABASE : https://opentdb.com/api_config.php
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.results.map((result_) => {
            const shuffleArray = (array) => {
              const theShuffledArray = [...array];
              // the following line of code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
              theShuffledArray.sort(() => Math.random() - 0.5);
              console.log(result, 'the fetch');
              return theShuffledArray;
            };
            return {
              ...result_,
              shuffledValues: shuffleArray([
                cleanWordsFromString(result_.correct_answer),
                ...result_.incorrect_answers.map(cleanWordsFromString),
              ]),
            };
          })
        );
      })
      .catch((error) => {
        console.log('Fetch error:', error);
      });
  }, [categoryId]);

  return (
    <>
      <div>
        <h1 className="quizH1">The {`${quizType}`} Quiz</h1>
        {data && (
          <ul>
            {data.map((result) => {
              return (
                <div key={result.question} className="questionDiv">
                  {/* question är unikt */}
                  <li>
                    {/* total points */}
                    {/* <div className="quizPoints">Total points: {point}</div> */}
                    {/* PROPS SOM ERSÄTTER OVANSTÅENDE KODRAD */}
                    <div id="pointContainer">
                      <Points point={point} />
                    </div>

                    {cleanWordsFromString(result.question)}
                    <div className="quizButtonDiv">
                      <p className="answers">
                        {/* Rätt svar: {result.correct_answer} */}
                        {result.shuffledValues.map((value) => (
                          <button
                            className="quizButton"
                            // GÖR KNAPPAR DISABLED EFTER SVAR
                            disabled={answerDone.includes(result.question)}
                            key={value}
                            onClick={() => {
                              setAnswerDone((earlierState) => [
                                ...earlierState,
                                result.question,
                              ]);
                              setClickedButtons([...clickedButtons, value]);
                              result.correct_answer === value
                                ? setPoint(point + 1)
                                : setPoint(point + 0);
                              console.log(result.correct_answer === value);
                              console.log(point);
                            }}
                            name={result.question}
                            type="button"
                          >
                            {value}
                          </button>
                        ))}{' '}
                      </p>
                    </div>
                    <div className="line"></div>
                  </li>
                </div>
              );
            })}
          </ul>
        )}
        {/* <div className="quizPoints">
          <h1>Total points: {point}</h1>
        </div> */}
        {/* PROPS SOM ERSÄTTER OVANSTÅENDE KODRAD */}
        <Points point={point} />
      </div>
    </>
  );
}

export default Quiz;
