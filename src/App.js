import Home from 'pages/home';
import { StyledEngineProvider } from '@mui/material/styles';
import './App.css';

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Home />
      </StyledEngineProvider>
    </>
  );
}

export default App;
