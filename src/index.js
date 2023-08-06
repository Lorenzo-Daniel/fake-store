import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "firebase/app";

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

import store from './StoreAppRedux/Store';
// import {firebaseConfig} from './firebaseConfig/firebaseConfig'
export const firebaseConfig = {
  apiKey: "AIzaSyAx-FQAzA_zs4uccqRctlBRdxUKs9BqRmg",
  authDomain: "fake-store-c9e57.firebaseapp.com",
  projectId: "fake-store-c9e57",
  storageBucket: "fake-store-c9e57.appspot.com",
  messagingSenderId: "681762385932",
  appId: "1:681762385932:web:03abf005b75cda4392fe29",
  measurementId: "G-PBD0XTP357",
};

 const app = initializeApp(firebaseConfig);
 // eslint-disable-next-line
 const analytics = getAnalytics(app);

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor = {persistor}>
  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
);
