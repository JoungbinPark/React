import { Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Join from './Component/member/Join';
import MyPage from './Component/member/MyPage';
import Main from './Component/Main';
import WritePost from './Component/post/WritePost';

function App() {

  return (
    <div className="App" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/join' element={<Join />}/>
        <Route path='/main' element={<Main />}/>
        <Route path="/writePost" element={<WritePost/>}></Route>
        <Route path="/myPage" element={<MyPage/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
