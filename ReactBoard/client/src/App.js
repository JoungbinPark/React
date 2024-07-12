import './App.css';

import { Routes, Route } from 'react-router-dom';

import Login from './Component/Login';
import Main from './Component/Main';
import JoinForm from './Component/member/JoinForm';
import MemberUpdate from './Component/member/MemberUpdate';
import BoardView from './Component/board/BoardView';
import WriteBoard from './Component/board/WriteBoard';
import UpdateBoard from './Component/board/UpdateBoard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/joinForm" element={<JoinForm />} />
      <Route path="/memberUpdate" element={<MemberUpdate />} />
      <Route path="/boardView/:num" element={<BoardView />} />
      <Route path="/writeBoard" element={<WriteBoard />} />
      <Route path="/updateBoard/:num" element={<UpdateBoard />} />
    </Routes>
  );
}

export default App;
