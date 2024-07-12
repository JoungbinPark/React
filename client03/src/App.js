import './App.css';
import Test from './Test';
import Login from './Login';

// Test.js 같은 파일 : 함수를 export 하는 파일 -> Component
// 누군가가 그를 import 해서 하나의 태그로 사용하면 include와 같은 형식으로 삽입이 가능합니다. 

/*  Component 생성규칙
  1. 컴포넌트 이름은 반드시 대문자로 시작
  2. 컴포넌트는 다른 컴포넌트에서 사용될 수 있도록 반드시 export
  3. 다른 컴포넌트를 사용하려면 반드시 import
  4. export와 import하는 관계에서 서로를 인식할 수 있는 이름을 반드시 맞춰서 사용
  5. import 된 컴포넌트는 태그형식으로 사용하며, 필요에 따라 여러번 표시되도록 태그를 필요한 곳에 여러번 쓸 수 있습니다. 

*/

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <Test />
      <h1>Hello World!</h1>
      <Test />
      <h1>Login Form</h1>
      <Login />
    </div>
  );
}

export default App;
