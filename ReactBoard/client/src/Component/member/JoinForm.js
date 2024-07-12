import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../style/board.css'

function JoinForm() {
    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdchk, setPwdchk] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const onsubmit = () => {
        if (!userid) { return alert('아이디를 입력하세요.'); }
        if (!pwd) { return alert('비밀번호를 입력하세요.'); }
        if (!name) { return alert('이름을 입력하세요.'); }
        if (!email) { return alert('이메일을 입력하세요.'); }
        if (!phone) { return alert('전화번호를 입력하세요.'); }
        if (pwd != pwdchk) { return alert('패스워드 확인이 일치하지 않습니다.'); }

        axios.post('/api/members/join', { userid, pwd, name, email, phone })
            .then((result) => {
                if (result.data.message) {
                    alert('회원가입이 완료되었습니다. 로그인하세요.');
                } else {
                    alert('회원가입에 문제가 있습니다. 관리자에게 문의하세요.');
                }
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                navigate('/');
            })
    }
    return (
        <div className="login">
            <form id='login-form'>
                <h2>Join</h2>
                <div className="field">
                    <label>USER ID</label>
                    <input type='text' value={userid} onChange={
                        (e) => { setUserid(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type='password' value={pwd} onChange={
                        (e) => { setPwd(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>PASSWORD CHECK</label>
                    <input type='password' value={pwdchk} onChange={
                        (e) => { setPwdchk(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>NAME</label>
                    <input type='text' value={name} onChange={
                        (e) => { setName(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <input type='text' value={email} onChange={
                        (e) => { setEmail(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>PHONE</label>
                    <input type='text' value={phone} onChange={
                        (e) => { setPhone(e.currentTarget.value) }
                    } />
                </div>
                <div className="btns">
                    <input type="button" value="회원가입" onClick={
                        () => { onsubmit() }
                    } />
                    <input type="button" value="돌아가기" onClick={
                        () => { navigate('/') }
                    } />
                </div>
                <div>{}</div>
            </form>
        </div>
    )
}

export default JoinForm
