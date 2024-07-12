import './App.css';

import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react'

import Join from './Component/Join';
import List from './Component/List';
import Heading from './Component/Heading';

function App() {

  const [contentList, setContentList] = useState([]);
  
  return (
    <div className="App">
      <Heading />
      <Routes>
        <Route path='/list' element={<List contentList={contentList} setContentList={setContentList} />} />
        <Route path='/join' element={<Join contentList={contentList} setContentList={setContentList} />} />
      </Routes>
    </div>
  );
}

export default App;
