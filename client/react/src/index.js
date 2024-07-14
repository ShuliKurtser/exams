import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter}from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: {
    //slice כאן יהיה את כל ה
    user: userSlice,
    // product: productSlice, - נוסף Sliceדוגמא ל
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//    <BrowserRouter><App /></BrowserRouter> 
//   // </React.StrictMode>
// );

root.render(
  <React.StrictMode>
    {/*react-redux מהספריה Provider תגית */}
    {/*App שיצרנו וכך הוא יזהה את המשתנים בכל הקומפוננטות שנמצאות בתוך ה store העברה בפרופ של המשתנה של ה */}
    <Provider store={store}>
      {/* הרכיב BrowserRouter הוא רכיב מפתח המסופק על ידי ספריית ה-React Router (react-router-dom).*/}
      {/* React הוא משמש להפעלת פונקציונליות ניתוב באפליקציית */}
      {/* BrowserRouter על ידי גלישת האפליקציה כולה ברכיב, */}
      {/*Route, Routes ו-Link נוכל להשתמש ברכיבי ניתוב אחרים כמו   */}
      {/* כדי להגדיר את תצורת הניתוב ולטפל בניווט בתוך האפליקציה שלנו. */}
      <BrowserRouter><App /></BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



