import React from 'react'

function List(props) {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'30px'}}>
      {/* props로 전달된 배열을 내용에 적절하게 출력하세요 */}
    <h2>회원 리스트</h2>
    {
        props.contentList.map((content, idx)=>{
            return(<div key={idx}>id : {content.id}, pwd : {content.pwd}, name :  {content.name}, phone : {content.phone}</div>)
        })
    }

    </div>
  )
}

export default List
