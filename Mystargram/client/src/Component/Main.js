// Main.js
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import MainMenu from './MainMenu'
import Post from './post/Post'
import '../style/Posts.css';


function Main() {
  const [loginUser, setLoginUser] = useState({});
  const [postList, setPostList] = useState([]);
  const [paging, setPaging ] = useState({});
  const [word, setWord] = useState('n');
  

  const navigate = useNavigate();



  useEffect(
    () => {
      axios.get('/api/member/getLoginUser')
        .then((result) => {
          if (!result.data.loginUser) {
            alert('로그인이 필요합니다');
            navigate('/');
          }
          setLoginUser(result.data.loginUser);
        })

        axios.get(`api/post/getPostList/1/${word}`)
        .then((result)=>{
          setPostList(result.data.postList);
          setPaging(result.data.paging);
        })
        .catch((err)=>{console.error(err)})
      },[word]
    )
  
    useEffect(
      ()=>{
        window.addEventListener('scroll', handleScroll);
        return()=>{window.removeEventListener('scroll', handleScroll);}
      }
    )
  


  const handleScroll=()=>{
    const scrollHeight = document.documentElement.scrollHeight - 50; // 스크롤이 가능한 크기
    const scrollTop = document.documentElement.scrollTop; // 현재 위치
    const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
    if(scrollTop+clientHeight >= scrollHeight){
      onPageMove(Number(paging.page)+1);
    }
  }

  async function onPageMove(page){
    const result = await axios.get(`api/post/getPostList/${page}/${word}`);
    setPaging(result.data.paging);
    let posts = [];
    posts = [...postList];
    posts = [...posts, ...result.data.postList];
    setPostList([...posts]);
  }

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainMenu setWord={setWord} />
      <div className="Posts">
        {
          (postList) ? (
            postList.map((post, idx) => {
              return (
                <Post post={post} postid={post.id} loginUser={loginUser} />
              )
            })
          ) : (null)
        }

      </div>
    </div>
  )
}



export default Main
