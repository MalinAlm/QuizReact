import { Link } from 'react-router-dom';

import '../css/StyleHomePage.css';
const linkStyle = {
  textDecoration: 'none',
};

function HomePage() {
  return (
    <>
      <section className="backgroundSection1">
        <div className="flexContainer">
          <h1 className="headingStyle">QUIZTOFER</h1>
          <button id="quizButton">
            <Link style={linkStyle} to="/quiz">
              Have a look at our Quizzes
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
