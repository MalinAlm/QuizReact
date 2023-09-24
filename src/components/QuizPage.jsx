import { Outlet, useNavigate } from 'react-router-dom';
import { categoriesToId } from '../Helpers/Helper';
import '../css/StyleQuizPage.css';

function QuizPage() {
  const navigate = useNavigate();

  const handleSelectedQuiz = (event) => {
    const selectedQuiz = event.target.value;
    navigate(`/quiz/${selectedQuiz}`);
  };
  const options = Object.keys(categoriesToId);

  return (
    <>
      <section className="sectionContainer">
        <div className="quizContainer">
          <select className="dropDown" onChange={handleSelectedQuiz}>
            <option value="">Choose a quiz category</option>
            {options.map((key) => (
              <option className="quizPgdrop" key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="quizContainer">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default QuizPage;
