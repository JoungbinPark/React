import { Routes, Route } from 'react-router-dom';

import Login from './Component/Login';
import Main from './Component/Main';
import Join from './Component/member/Join';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/join' element={<Join />}/>
        <Route path='/main' element={<Main />}/>

      </Routes>

    </div>
  );
}

export default App;
