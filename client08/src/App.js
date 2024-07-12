import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import A from "./Component/A";
import B from "./Component/B";
import C from "./Component/C";


function App() {
  return (
    <div className="App">
      <h1>하이</h1>
      <a href="/A">A로 이동</a> &nbsp;&nbsp;&nbsp;
      <a href="/B">B로 이동</a> &nbsp;&nbsp;&nbsp;
      <a href="/C">C로 이동</a> &nbsp;&nbsp;&nbsp;

      <Routes>
        <Route path="/A" element={<A />} />
        <Route path="/B" element={<B />} />
        <Route path="/C" element={<C />} />
      </Routes>

    </div>
  );
}

export default App;
