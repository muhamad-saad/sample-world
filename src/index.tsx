import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Fonts } from 'shared/styles/fonts';
import { store } from './shared/infrastructure/redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
        <App />
        <Fonts />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
