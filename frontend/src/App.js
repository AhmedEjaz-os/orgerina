import './App.scss';
import HomePage from './component/HomePage';
import ThemeContext from './themeContext/ThemeContext';


function App() {
  return (
    <ThemeContext>
      <HomePage />
    </ThemeContext>
  );
}

export default App;
