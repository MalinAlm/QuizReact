import PropTypes from 'prop-types';
import '../css/StyleQuiz.css';

const TotalPoints = ({ point }) => {
  console.log(point, 'här syns poängen');
  return (
    <>
      <div className="quizPoints">
        <p>Total points: {point}</p>
      </div>
    </>
  );
};
TotalPoints.propTypes = {
  point: PropTypes.number,
};
export default TotalPoints;
