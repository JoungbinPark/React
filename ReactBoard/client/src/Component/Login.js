import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../style/board.css'


function Login() {
    
    const [userid, setUserid ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ message, setMessage ] = useState('');

    const navigate = useNavigate();

    const onsubmit = ()=>{
        if( !userid ) { return alert('아이디를 입력하세요');}
        if( !pwd ) { return alert('패스워드를 입력하세요');}

        axios.post('/api/members/login', {userid, pwd})
        .then((result)=>{
            if(result.data.message === 'ok'){
                navigate('/main');
            } else { 
                setMessage( result.data.message);
            }

        })
        .catch((err)=>{
            console.error(err);
            navigate('/');      // 외부주소 아닌 내부주소망에서 route 이동을 할때
        });
    }

  return (
    <div className="login">
        <form id="login-form">
            <div className="field">
                <label>USER ID</label>
                <input type="text" value={userid} onChange={
                    (e)=>{ setUserid(e.currentTarget.value) }
                }/>
            </div>
            <div className="field">
                <label>PASSWORD</label>
                <input type="password" value={pwd} onChange={
                    (e)=>{ setPwd(e.currentTarget.value) }
                }/>
            </div>
            <div className="btns">
                <input type="button" value="LOGIN" onClick={
                    ()=>{ onsubmit() }
                } />
                <input type="button" value="JOIN" onClick={
                    ()=>{ navigate('/joinForm')}
                }/>
            </div>
            <div>{message}</div>
        </form>
    </div>
  )
}

export default Login
