import { useState } from 'react';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import Quiz from './components/Quiz';
import SwedishQuiz from './components/SwedishQuiz';
import About from './components/About';
import SomeContext from './components/SomeContext';
// makes user input form visible on all apges

import UserName from './components/userName';

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

function Root() {
  const ulStyle = {
    display: 'flex',

    position: 'fixed',
    top: 0,
    width: '100%',
  };
  const liStyle = {
    marginLeft: '5rem',
    listStyle: 'none',
  };
  const linkStyle = {
    textDecoration: 'none',
  };
  return (
    <>
      <nav className="navBar">
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link style={linkStyle} to="/">
              Home
            </Link>
          </li>
          <li style={liStyle}>
            <Link style={linkStyle} to="/quiz">
              Quiz
            </Link>
          </li>
          <li style={liStyle}>
            <Link style={linkStyle} to="/quiz/swedish">
              Swedish Quiz
            </Link>
          </li>
          <li style={liStyle}>
            <Link style={linkStyle} to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
function App() {
  const [theUserName, setTheUserName] = useState(null);

  const router = createHashRouter([
    {
      children: [
        { element: <HomePage />, path: '/' },
        // nestlade routes som gör quiz synlig
        {
          children: [{ element: <Quiz />, path: '/quiz/:quiztype' }],
          element: <QuizPage />,
          path: 'quiz',
        },
        { element: <SwedishQuiz />, path: '/quiz/swedish' },
        { element: <About />, path: '/about' },
      ],
      element: <Root />,
    },
  ]);
  return (
    <>
      <SomeContext.Provider value={{ theUserName, setTheUserName }}>
        <RouterProvider router={router} />
        {/* får form att synas på alla sidor */}
        <UserName />
      </SomeContext.Provider>
    </>
  );
}

export default App;
