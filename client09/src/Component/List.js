import React from 'react'

function List(props) {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'30px'}}>
        <h2>입력된 단어 리스트</h2>
        {
            props.contentList.map((content, idx)=>{
                return <h3 style={{margin:'5px'}} key={idx}>{content}</h3>
            })
        }
      
    </div>
  )
}

export default List
