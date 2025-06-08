import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FormPage from './FormPage';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/next-page" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;