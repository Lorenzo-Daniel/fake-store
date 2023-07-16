import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './StoreAppRedux/Store'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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

 initializeApp(firebaseConfig);


const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor = {persistor}>

  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
);
