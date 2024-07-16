import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import MainMenu from '../MainMenu';

import '../../style/writePost.css'

function WritePost() {
    const [loginUser, setLoginUser] = useState({});
    const [word, setWord] = useState('n');

    const navigate = useNavigate();
    const [content, setContent] = useState('');

    const [imgSrc1, setImgSrc1] = useState('');
    const [imgSrc2, setImgSrc2] = useState('');
    const [imgSrc3, setImgSrc3] = useState('');
    const [imgSrc4, setImgSrc4] = useState('');
    const [imgSrc5, setImgSrc5] = useState('');
    const [imgSrc6, setImgSrc6] = useState('');
    const [imgSrc7, setImgSrc7] = useState('');
    const [imgSrc8, setImgSrc8] = useState('');
    const [imgSrc9, setImgSrc9] = useState('');
    const [imgSrc10, setImgSrc10] = useState('');

    const [divStyle2, setDivStyle2] = useState({ display: 'none' });
    const [divStyle3, setDivStyle3] = useState({ display: 'none' });
    const [divStyle4, setDivStyle4] = useState({ display: 'none' });
    const [divStyle5, setDivStyle5] = useState({ display: 'none' });
    const [divStyle6, setDivStyle6] = useState({ display: 'none' });
    const [divStyle7, setDivStyle7] = useState({ display: 'none' });
    const [divStyle8, setDivStyle8] = useState({ display: 'none' });
    const [divStyle9, setDivStyle9] = useState({ display: 'none' });
    const [divStyle10, setDivStyle10] = useState({ display: 'none' });

    const [imgList, setImgList] = useState([]);

    const fieldStyle = {
        width: '100%',
        display: 'flex',
        margin: '5px 0',
        justifyContent: 'space-between',
        border: '1px solid black',
    }

    useEffect(
        () => {
            axios.get('/api/member/getLoginUser')
                .then((result) => {
                    if (!result.data.loginUser) {
                        alert('로그인이 필요합니다.');
                        navigate('/');
                    }
                    setLoginUser(result.data.loginUser);
                })
                .catch((err) => { console.error(err) })
        }, []
    )

    async function imgUpload(e, n) {
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        const result = await axios.post('/api/post/imgup', formData);

        if (n == 1) {
            setDivStyle2(fieldStyle);
            setImgSrc1(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 2) {
            setDivStyle3(fieldStyle);
            setImgSrc2(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 3) {
            setDivStyle4(fieldStyle);
            setImgSrc3(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 4) {
            setDivStyle5(fieldStyle);
            setImgSrc4(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 5) {
            setDivStyle6(fieldStyle);
            setImgSrc5(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 6) {
            setDivStyle7(fieldStyle);
            setImgSrc6(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 7) {
            setDivStyle8(fieldStyle);
            setImgSrc7(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 8) {
            setDivStyle9(fieldStyle);
            setImgSrc8(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 9) {
            setDivStyle10(fieldStyle);
            setImgSrc9(`http://localhost:5000/upimg/${result.data.filename}`);
        } else if (n == 10) {
            setImgSrc10(`http://localhost:5000/upimg/${result.data.filename}`);
        }

        let arr = [...imgList];
        arr.push(result.data.filename);
        setImgList([...arr]);
        console.log(imgList);
    }

    async function onSubmit() {
        if (!content) { return alert('내용을 입력하세요'); }
        if (!imgList) { return alert('이미지를 하나 이상 선택하세요') }
        //content와 작성자로 post 테이블에 레코드를 추가. 이때 insert된 레코드의 id를 리턴
        const result = await axios.post('/api/post/writePost', { content, writer: loginUser.nickname })
        let postid = result.data.postid;

        // 리턴된 아이디와 이미지 이름들로 images 태이블에 레코드들을 추가
        for (let i = 0; i < imgList.length; i++) {
            await axios.post('/api/post/writeImages', { postid, filename: imgList[i] });
        }
        window.location.href = 'http://localhost:3000/main'
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MainMenu setWord={setWord} />
            <div className='postWrite'>
                <div className='title' style={{ fontFamily: 'Dancing Script', fontSize: '150%' }}>Feed Write</div>
                <div className='field'>
                    <label>content</label>
                    <textarea rows='7' value={content} onChange={
                        (e) => { setContent(e.currentTarget.value) }
                    }></textarea>
                </div>
                <div className='field' id='img1'>
                    <input type='file' onChange={(e) => { imgUpload(e, 1) }} />
                </div>
                <img src={imgSrc1} height="50" />

                <div className='field' id='img2' style={divStyle2}>
                    <input type='file' onChange={(e) => { imgUpload(e, 2) }} />
                </div>
                <img src={imgSrc2} height="50" />

                <div className='field' id='img3' style={divStyle3}>
                    <input type='file' onChange={(e) => { imgUpload(e, 3) }} />
                </div>
                <img src={imgSrc3} height="50" />

                <div className='field' id='img4' style={divStyle4}>
                    <input type='file' onChange={(e) => { imgUpload(e, 4) }} />
                </div>
                <img src={imgSrc4} height="50" />

                <div className='field' id='img5' style={divStyle5}>
                    <input type='file' onChange={(e) => { imgUpload(e, 5) }} />
                </div>
                <img src={imgSrc5} height="50" />

                <div className='field' id='img6' style={divStyle6}>
                    <input type='file' onChange={(e) => { imgUpload(e, 6) }} />
                </div>
                <img src={imgSrc6} height="50" />

                <div className='field' id='img7' style={divStyle7}>
                    <input type='file' onChange={(e) => { imgUpload(e, 7) }} />
                </div>
                <img src={imgSrc7} height="50" />

                <div className='field' id='img8' style={divStyle8}>
                    <input type='file' onChange={(e) => { imgUpload(e, 8) }} />
                </div>
                <img src={imgSrc8} height="50" />

                <div className='field' id='img9' style={divStyle9}>
                    <input type='file' onChange={(e) => { imgUpload(e, 9) }} />
                </div>
                <img src={imgSrc9} height="50" />

                <div className='field' id='img10' style={divStyle10}>
                    <input type='file' onChange={(e) => { imgUpload(e, 10) }} />
                </div>
                <img src={imgSrc10} height="50" />

                <div className='btns'>
                    <button onClick={() => { onSubmit() }}>작성완료</button>
                    <button onClick={() => { navigate('/main') }}>Main으로</button>
                </div>

            </div>

        </div>
    )
}

export default WritePost
