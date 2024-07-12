import React, {useState } from 'react'
import '../css/join.css'


// 입력한 내용을 스테이트 변수에 실시간으로 저장하고 제출 버튼을 누르면 입력 내용이 하나의 객체 또는 배열에 저장되어서 List에서 출력되게 코딩하세요
function Join(props) {

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const onsubmit=()=>{
        let inputData = {};
        inputData.id = id;
        inputData.pwd = pwd;
        inputData.name = name;
        inputData.phone = phone;

        let arr = [...props.contentList ];
        arr.push(inputData);
        props.setContentList([...arr]);
        setId('');
        setPwd('');
        setName('');
        setPhone('');

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
            <div className='btns' style={{display:"flex", width:"100%"}}>
                <button style={{flex:"1", height:"50px"}} onClick={()=>{ onsubmit()}}>제출</button>
            </div>
        </div>
  )
}

export default Join
