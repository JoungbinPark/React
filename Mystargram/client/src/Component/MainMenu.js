import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import '../style/MainMenu.css'

function MainMenu(props) {
  const [loginUser, setLoginUser] = useState({});
  const [searchTag, setSearchTag] = useState('');
  const [inputStyle, setInputStyle] = useState({});
  const [viewOrNot, setViewOrNot] = useState(false);
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState('http://localhost:5000/images/user.png');

  useEffect(
    () => {
      axios.get('/api/member/getLoginUser')
        .then((result) => {
          if (result.data.loginUser) {
            setLoginUser(result.data.loginUser);
            if( result.data.loginUser.profileimg){
              setImgSrc(result.data.loginUser.profileimg)
            }
            console.log('r', result.data.loginUser.profileimg, result.data.loginUser);
          }
        })
        .catch((err)=>{console.error(err)})
    }, []
  )

  useEffect(()=>{
    if(viewOrNot){
      setInputStyle({display:'flex', marginBottom:'10px'});
    } else{
      setInputStyle({display:'none'})
      props.setWord('n');
      setSearchTag('');
    }
  },[viewOrNot])


  function onLogout(){
    axios.get('/api/member/logout')
    .then(()=>{
      navigate('/'); //routes 안에서만 이동
      window.location.href="http://localhost:3000/";  //페이지 전체 이동
    })
    .catch((err)=>{console.error(err)})
  }

  function onSearch(){
    props.setWord(searchTag);

  }

  return (
    <div>
      <div className='topmenu'>
        <img src='http://localhost:5000/images/home.png' onClick={
          ()=>{navigate('/main')}
          } />
        <img src='http://localhost:5000/images/write.png' onClick={
          ()=>{
            navigate('/writePost');
          }
        } />
        <img src='http://localhost:5000/images/search.png' onClick={
          ()=>{setViewOrNot( !viewOrNot );
        }} />
        <img src={imgSrc} onClick={
          ()=>{navigate('/myPage')}
        } />
        <img src='http://localhost:5000/images/logout.png' onClick={
          ()=>{onLogout()}
          } />
      </div>

      <div className = "search" style={inputStyle}>
        <input type="text" value={searchTag} style={{flex:'4', padding:'3px'}} onChange={(e)=>{setSearchTag(e.currentTarget.value)}} />
        <button style={{flex:'1', padding:'3px'}} onClick={()=>{onSearch()}}>해시태그 검색</button>

      </div>
    </div>
  )
}

export default MainMenu