import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function List() {
  const [members, setMembers] = useState([]);
  useEffect(
    () => {
      // 멤버를 조회해서 members 변수에 저장하고 아래 return 에서 전송받은 데이터를 화면에 출력하세요
      axios.get('/api/getMembers')
        .then((result) => {
          setMembers([...result.data]);
          console.log(`members : ${members}`);
        })
        .catch((err) => {
          console.error(err)
        });

        return () =>{
          alert('컴포넌트가 사라집니다.');
        }
    }, [] //useEffect가 실행될 조건. 안쓰면 1번만 실행
    // 주의 : []안에 넣는 변수를 함수안에서 변경하지 마세요.
  );


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
      {/* props로 전달된 배열을 내용에 적절하게 출력하세요 */}
      <h2>회원 리스트</h2>
      {(members) ? (  //members가 비어있을 경우 에러가 발생하기 때문에 예외처리
        members.map((member, idx) => {
          return (<div key={idx}>id : {member.userid}, pwd : {member.pwd}, name :  {member.name}, phone : {member.phone}, email : {member.email}</div>)
        })
      ) : (null)
      }

    </div>
  )
}

export default List
