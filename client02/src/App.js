import logo from './logo.svg';
import './App.css';

// function App(){} : 하나의 테그를 구성해서 리턴해주는 함수
// App() 함수는 index.js에서 import되고
// index.js의 내용은 public 폴더의 index.html 중 id가 root인 div 태그에 내용을 삽입해줍니다. 
// 아래 함수의 return 내부 내용이 index.html에 표시될 예정이며, 내용의 변경은 저장 즉시 반영됩니다. 

function App() {
  return (
    // 리턴되는 태그는 반드시 하나의 태그로 묶여있어야합니다. 
    // 최상위 태그는 반드시 div이어야 하는 것은 아닙니다. 묶여 있기만 하면 되므로 <></>과 같은 태그를 많이 사용합니다. 
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
      {/* html 파일에서는 <!-- -->를 주석구문으로 사용하지만 현재 영역은 리턴값들의 영역이기 때문에 주석기호가 이와 같이 중괄호와 자바스크립트 주석문의 형식으로 사용됩니다. */}

      {/* 태그의 id는 이전과 같은 형식으로 사용하지만 class가 className이라는 속성이름으로 사용됩니다.(대소문자 구분) */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </>
  );
}

export default App;
