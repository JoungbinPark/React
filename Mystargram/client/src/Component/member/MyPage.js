import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import MainMenu from '../MainMenu';
import '../../style/mypage.css'

function MyPage() {
    const [word, setWord] = useState('n');

    const [imgSrc, setImgSrc] = useState('http://localhost:5000/images/user.png');
    const [followers, setFollowers] = useState([]);   //나를 follow하는 사람들
    const [followings, setFollowings] = useState([]); //내가 following하는 사람들
    const [postList, setPostList] = useState([]);  //로그인유저가 작성한 포스트들
    const [imgList, setImgList] = useState([]);   //하단에 포스트를 대변할 수 있는 이미지들
    const [loginUser, setLoginUser] = useState({});

    const navigate = useNavigate();

    useEffect(
        () => {
            axios.get('/api/member/getLoginUser')
                .then((result) => {
                    setLoginUser(result.data.loginUser);
                    setFollowers(result.data.followers);
                    setFollowings(result.data.followings);
                    if (result.data.loginUser.profileimg) {
                        setImgSrc(result.data.loginUser.profileimg)
                    }
                })
                .catch((err) => { console.error(err) })

            axios.get('/api/post/getMyPost')
                .then((result) => {
                    setPostList(result.data.postList);
                    setImgList(result.data.imgList);
                })
                .catch((err) => { console.error(err) })
        }, []
    )
    return (
        <div className='mypage'>
            <MainMenu setWord={setWord} />
            <div className='userinfo'>
                <div className='img'>
                    <img src={imgSrc} />
                </div>
                <div className='profile'>
                    <div className='field'>
                        <label>E-mail</label>
                        <div>{loginUser.email}</div>
                    </div>
                    <div className='field'>
                        <label>NickName</label>
                        <div>{loginUser.nickname}</div>
                    </div>
                    <div className='field'>
                        <label>Followers</label>
                        <div>{(followers) ? (followers.length) : (0)}</div>
                    </div>
                    <div className='field'>
                        <label>Followings</label>
                        <div>{(followings) ? (followings.length) : (0)}</div>
                    </div>
                    <div className='field'>
                        <label>Intro</label>
                        <div>{loginUser.profilemsg}</div>
                    </div>
                </div>
            </div>
            <div className='btns'>
                <button>Edit Profile</button>
                <button>Post Write</button>
            </div>
            <div className='userpost'>
                {/* 한줄에 세개씩 이미지를 적당한 크기로 나열해주세요. 필요하다면 css수정도 해주세요 */}
                {
                    (imgList)?(
                        imgList.map((imgs, idx)=>{
                            return(
                                <div key={idx}>
                                    <img src={`http://localhost:5000/upimg/${imgs}`} width='250' />
                                </div>
                            )
                        })
                    ):(null)
                }

            </div>
        </div>
    )
}

export default MyPage
