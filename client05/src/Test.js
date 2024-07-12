import React, { useState, useEffect } from 'react'
import './Test.css'

function Test() {
    const [temp, setTemp] = useState('Test');
    //state 변수에는 어떤 형태의 자료형도 초기화될 수 있습니다. 
    //아래와 같이 배열로도 초기화가 가능합니다. 
    //const [tempArr, setTempArr] = useState([1,2,3]);

    //반드시 배열의 값이 하나이상 존재하는 배열은 아니어도 됩니다. 
    //const [tempObj, setTempObj] = useState({});
    const [tempArr, setTempArr] = useState([]);
    const [number, setNumber] = useState(0);

    useEffect(
        ()=>{
            //tempArr.push( number );
            let arr =[];
            arr = [...tempArr];
            arr.push(number);
            setTempArr([...arr]);
    }, [number]
);

  //(result)? (<></>):(null);
  return (
    <div>
        <h2>{temp} Component입니다. {number}</h2>
        <h2>{tempArr}</h2>
        <button onClick={()=>{
            setNumber(number + 1);
            //tempArr.push( number );
        }}>배열 요소 추가하기</button>
        {/* setNumber와 같은 스테이트 변수 변경함수는 대표적인 비동기함수입니다. */}
    </div>
  )
}

export default Test
