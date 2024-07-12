import React, {useState } from 'react'

function Upload(props) {

    const [content, setContent ] = useState("");

    const onsubmit = ()=>{
        let arr = [...props.contentList ];
        arr.push(content);
        props.setContentList([...arr]);
        setContent('');
    }

  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'20px'}}>
        <input type='text' value={content} onChange={(e)=>{
            setContent( e.currentTarget.value);
        }} />
        <button onClick={()=>{ onsubmit() }}>전송</button>
      
    </div>
  )
}

export default Upload
