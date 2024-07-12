import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function MemberUpdate() {
    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdchk, setPwdchk] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get('/api/members/getLoginUser')
            .then((result)=>{
                if(!result.data){
                    alert('로그인이 필요한 서비스입니다.');
                    navigate('/');
                }else{
                    setUserid(result.data.userid);
                    setName(result.data.name);
                    setEmail(result.data.email);
                    setPhone(result.data.phone);
                }
            }).catch((err)=>{
                console.error(err);
            })
        }, []
    );

    function onSubmit(){
        if( !pwd){ return alert("패스워드를 입력하세요");}
        if( !name){ return alert("이름을 입력하세요");}
        if( !email){ return alert("이메일을 입력하세요");}
        if( !phone){ return alert("전화번호를 입력하세요");}
        if( pwd != pwdchk ) { return alert("패스워드 확인이 일치하지 않습니다.");}
        axios.post('/api/members/updateMember', {userid, pwd, name, email, phone})
        .then((result)=>{
            alert('회원 수정이 완료되었습니다.');
            navigate('/main');
        })
        .catch((err)=>{
            console.error(err);
        });

    }



  return (
    <div className="login">
            <form id='login-form'>
                <h2>Update</h2>
                <div className="field">
                    <label>USER ID</label>
                    <input type='text' value={userid} readOnly />
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type='password' value={pwd} onChange={
                        (e)=>{ setPwd(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>PASSWORD CHECK</label>
                    <input type='password' value={pwdchk} onChange={
                        (e)=>{ setPwdchk(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>NAME</label>
                    <input type='text' value={name} onChange={
                        (e)=>{ setName(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <input type='text' value={email} onChange={
                        (e)=>{ setEmail(e.currentTarget.value) }
                    } />
                </div>
                <div className="field">
                    <label>PHONE</label>
                    <input type='text' value={phone} onChange={
                        (e)=>{ setPhone(e.currentTarget.value) }
                    } />
                </div>
                <div className="btns">
                <input type="button" value="정보수정" onClick={
                    ()=>{ onSubmit() }
                } />
                <input type="button" value="돌아가기" onClick={
                    ()=>{ navigate('/main')}
                }/>
            </div>
            <div>{}</div>
            </form>
        </div>
  )
}

export default MemberUpdate
