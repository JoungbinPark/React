import './App.css';
import React, {useState} from 'react'

// input 태그의 사용
// input type='text'에 입력된 내용을 state 변수로 추출하는 방법

function App() {
  // 입력란에 쓰여진 내용이 저장될 state 변수를 생성
  const [content, setContent] = useState('');   
  const [contentList, setContentList] = useState([]); //단어들을 배열로 저장할 배열

  // 전송버튼을 클릭하면 입력란의 값을 배열에 추가하고 입력란을 비웁니다. 
  function onsubmit(){ //return의 바깥쪽에 작성
    let tempArr = [...contentList];
    tempArr.push( content );
    setContentList([...tempArr]);
    setContent('');
  }

  return (
    <div className="App">
      <input type='text' value={content}  onChange={(e)=>{
        setContent(e.currentTarget.value);
      }} />
      {/* 
        입력란 입력 -> content 변수로 입력값 전달 -> 입력란 value값으로 복귀
        동작의 연속입니다. 입력란의 최신내용은 content에 계속 업데이트
      */}
      <button onClick={()=>{
        onsubmit();
      }}>전송</button><br />
      {
        contentList.map( (con, idx)=>{
          return <div key={idx}>{con}</div>
        })
        // map 함수 안에서 배열의 요속들로 화면에 표시하고자 한다면 위와 같이 익명함수에 return 명령을 사용합니다. 
        // map 함수를 이용해서 같은 종류의 태그가 연속해서 같은 위치에 등장한다면 각 태그들에 key라는 속성을 부여해야 경고 및 에러가 발생하지 않습니다. 
      }
    </div>
  );
}

export default App;
