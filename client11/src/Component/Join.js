import React, {useState } from 'react'
import '../css/join.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// 입력한 내용을 스테이트 변수에 실시간으로 저장하고 제출 버튼을 누르면 입력 내용이 하나의 객체 또는 배열에 저장되어서 List에서 출력되게 코딩하세요
function Join(props) {

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();     //location.href와 비슷한 기능의 함수를 생성

    const onsubmit=()=>{

        axios.post('/api/join', {id, pwd, name, phone, email})
        .then(()=>{alert('회원가입이 완료되었습니다.'); })
        .catch((err)=>{console.error(err); })

        setId('');
        setPwd('');
        setName('');
        setPhone('');
        setEmail('');

    }

  return (
    <div className='container'>
            <div className='field'>
                <label>아이디</label>
                <input type="text" value={id} onChange={(e)=>{
                    setId(e.currentTarget.value);
                }}/>
            </div>
            <div className='field'>
                <label>비밀번호</label>
                <input type="password" value={pwd} onChange={(e)=>{
                    setPwd(e.currentTarget.value);
                }}/>
            </div>
            <div className='field'>
                <label>이름</label>
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.currentTarget.value);
                }}/>
            </div>
            <div className='field'>
                <label>전화번호</label>
                <input type="text" value={phone} onChange={(e)=>{
                    setPhone(e.currentTarget.value);
                }}/>
            </div>
            <div className='field'>
                <label>이메일</label>
                <input type="text" value={email} onChange={(e)=>{
                    setEmail(e.currentTarget.value);
                }}/>
            </div>
            <div className='btns' style={{display:"flex", width:"100%"}}>
                <button style={{flex:"1", height:"50px"}} onClick={()=>{ onsubmit()}}>제출</button>
            </div>
        </div>
  )
}

export default Join
