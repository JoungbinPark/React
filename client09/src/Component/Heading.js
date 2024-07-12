import React from 'react'
import { Link } from 'react-router-dom'

function Heading() {
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', padding:'10px'}}>
      <Link to="/">HOME</Link>
      <Link to="/upload">UPLOAD</Link>
      <Link to="/list">LIST</Link>
    </div>
    // return 문 안에서 직접 css를 style 속성으로 지정할 땐 style={{}}와 같은 형식으로 씁니다. 
    // 스타일 내용이 객체({}) 형식으로 전달되어야 하고, JSX형식의 객체로 구성된 스타일이 지정되므로 style={} 중괄호 안에 {} 객체가 전달되는 형식입니다. 
  )
}

export default Heading
