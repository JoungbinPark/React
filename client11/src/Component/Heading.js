import React from 'react'
import { Link } from 'react-router-dom'


function Heading() {
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', margin:'30px'}}>
      <Link to="/" style={{margin:'0 30px'}} >HOME</Link>
      <Link to="/join" style={{margin:'0 30px'}}>JOIN</Link>
      <Link to="/list" style={{margin:'0 30px'}}>LIST</Link>
    </div>
  )
}

export default Heading
