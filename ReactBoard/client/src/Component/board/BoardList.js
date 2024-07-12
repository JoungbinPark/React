import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../style/board.css';

function BoardList() {


  const [boardList, setBoardList] = useState([]);
  const [paging, setPaging] = useState({});
  const [beginend, setBeginend] = useState([]);
  const navigate = useNavigate();

  useEffect(
    () => {
      axios.get('/api/boards/getBoardList/1')
        .then((result) => {
          setBoardList([...result.data.boardList]);
          console.log(result.data.boardList);
          setPaging(result.data.paging);

          // const pageArr = [];
          // for (let i = result.data.paging.beginPage; i <= result.data.paging.endPage; i++) {
          //   pageArr.push(i);
          // }
          // setBeginend([...pageArr]);

        })
        .catch((err) => { console.error(err) })
    },[]
  )

  useEffect(
    () => {
      // 컴포넌트가 시작될 때       
      window.addEventListener('scroll', handleScroll);
      // window에 scroll 이벤트가 발생하면 handleScroll 함수를 호출해서 실행해주세요. 

      // 컴포넌트가 끝날 때 
      return () => {
        // scroll eventLister 해제
        window.removeEventListener('scroll', handleScroll);
      }
    }
  )

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight-10; // 스크롤이 가능한 크기
    const scrollTop = document.documentElement.scrollTop; //현재 위치
    const clientHeight = document.documentElement.clientHeight//내용물의 크기

    // 스크롤을 시도하여 이동한 현재위치값에 내용물 크기를 더한 값이 스크롤할 수 있는 크기(한계)를 넘어섰다면 -> 화면 밑에까지 끝까지 스크롤했다면
    if (scrollTop + clientHeight >= scrollHeight) {
      onPageMove(Number(paging.page) + 1);
    }
  }

  function onBoardView(num) {
    navigate(`/boardView/${num}`);
  }

  function onPageMove(page) {
    //매개변수로 전달된 페이지로 게시물을 검색한 후 리스트를 갱신하세요


    // 스크롤 방식
    axios.get(`/api/boards/getBoardList/${page}`)
      .then((result) => {
        setPaging(result.data.paging);
        let boards = [];
        boards = [...boardList];  // 현재 boardList의 내용 복사
        boards = [...boards, ...result.data.boardList]; // 새로 조회한 페이지의 목록과 Merge
        setBoardList([...boards]);  //Merge한 리스트를 boardList로 복사
      })
      .catch((err) => { console.error(err) })


    // 페이지 표시방식 
    // axios.get(`/api/boards/getBoardList/${page}`)
    // .then((result)=>{
    //   setBoardList([...result.data.boardList]);
    //   setPaging(result.data.paging);

    //   const pageArr = [];
    //   for (let i = result.data.paging.beginPage; i <= result.data.paging.endPage; i++) {
    //     pageArr.push(i);
    //   }
    //   setBeginend([...pageArr]);
    // })
    // .catch((err)=>{ console.error(err)})

  }

  return (
    <div className='boardList'>
      <div className='titlerow'>
        <div className='titlecol'>번호</div>
        <div className='titlecol'>제목</div>
        <div className='titlecol'>글쓴이</div>
        <div className='titlecol'>작성일</div>
        <div className='titlecol'>조회수</div>
      </div>
      {
        boardList.map((board, idx) => {
          return (
            <div className='row' key={idx}>
              <div className='col'>{board.num}</div>
              <div className='col' onClick={() => {
                onBoardView(board.num);
              }}>{board.title}</div>
              <div className='col'>{board.userid}</div>
              <div className='col'>{board.writedate.substring(0, 10)}</div>
              <div className='col'>{board.readcount}</div>
            </div>
          )
        })
      }



      {/* <div id='paging' style={{textAlign:'center', padding:'10px'}}>
        {
          (paging.prev) ? (
            <span style={{ cursor: 'default' }} onClick={
              () => { onPageMove(paging.beginPage - 1) }
            }>&nbsp;◀&nbsp;</span>
          ) : (<></>)
        }
        {
          (beginend) ? (
            beginend.map((page, idx) => {
              return (
                <span style={{ cursor: 'default' }} key={idx} onClick={
                  () => { onPageMove(page) }
                }>&nbsp;{page}&nbsp;</span>
              )
            })
          ) : (<></>)
        }
        {
          (paging.next) ? (
            <span style={{ cursor: 'default' }} onClick={
              () => { onPageMove(paging.endPage + 1) }
            }>&nbsp;▶&nbsp;</span>
          ) : (<></>)
        }
      </div> */}



    </div>
  )
}


{

}

export default BoardList
