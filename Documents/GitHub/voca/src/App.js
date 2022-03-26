import React from 'react';
import './App.css';
import { Link, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add';
import Nopage from './pages/Nopage';


function App() {
  
  return (  
    <div className="App">
      <header>
        <Link to="/">잘 외워지는 단어장</Link>
      </header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add" element={<Add />}/>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
}

export default App;
