import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './StoreAppRedux/Store'

const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor = {persistor}>

  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
);
