import QuizEngine from './QuizEngine.jsx';
import quizConfig from './quizConfig.js';
import BoxExplosion from './BoxExplosion.jsx';

export default function App() {
  return <QuizEngine config={quizConfig} Explosion={BoxExplosion} />;
}
