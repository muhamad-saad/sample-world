import Home from 'modules/country/pages/home';
import Details from 'modules/country/pages/details';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getMode } from 'modules/country/redux/countrySlice';
import './app.scss';

const App = () => {
	const mode = useSelector(getMode)
	return (
		<>
			<StyledEngineProvider injectFirst>
				<div className={classNames({'dark': mode === 'dark'}, {'light': mode === 'light'})}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/details" element={<Details />} />
					</Routes>
				</BrowserRouter>
				</div>
			</StyledEngineProvider>
		</>
	);
}

export default App;
