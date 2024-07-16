const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

async function getConnection(){
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'adminuser',
        database : 'mystargram'
    });
    return connection;
}

try{
    fs.readdirSync('uploads/');
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads/');
}

const uploadObj = multer({
    storage: multer.diskStorage({
        destination(req, file, done){ done(null, 'uploads/');},
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize:5*1024*1024},
});

router.post('/fileupload', uploadObj.single('image'), (req, res)=>{
    res.send(
        {
            profileimg : req.file.filename,
        }
    )
})

router.post('/imgup', uploadObj.single('image'), (req, res, next)=>{
    res.send({filename:req.file.filename,});
})

router.post('/writePost', async (req, res)=>{
    const { content, writer } = req.body;
    try{
        const connection = await getConnection();
        //post 테이블에 레코드를 추가합니다. id 저장
        let sql = 'insert into post(content, writer) values(?,?)';
        let [result, fields] = await connection.query(sql, [content, writer]);
        const postid = result.insertId; 
        console.log(`postid : ${postid}`)
        // 본문(content) 에서 해시태그를 분리합니다. 
        const hashtags = content.match(/(?<=#)[^\s#]+/g)
        console.log(`해시태그들 : ${hashtags}`);
        // 각 해시태그들을 새로운 태그들만 hashtag 테이블에 저장 id 저장
        if( hashtags ){
            hashtags.map(async ( tag, idx)=>{
                // 현재 태그가 hashtag 테이블에 존재하는지 조회
                sql = 'select * from hashtag where word=?';
                let [rows, field2] = await connection.query(sql, [tag]);
                let tagid;
                if(rows.length>=1){
                    tagid = rows[0].id;
                } else{
                    sql = 'insert into hashtag(word) values(?)';
                    let [result2, field] = await connection.query(sql, [tag]);
                    tagid = result2.insertId;
                }
                console.log(`Tagid = ${tagid}`)

                // postid와 hashid로 post_hash테이블에 레코드를 추가
                sql = 'insert into post_hash(postid, hashid) values(?,?)';
                let [result3, field3 ] = await connection.query(sql, [postid, tagid]);
            })
        }
        res.send({postid});
    } catch(err){
        console.error(err);
    }
})

router.post('/writeImages', async (req, res)=>{
    const {postid, filename} = req.body;
    try{
        const connection = await getConnection();
        let sql = 'insert into images(postid, savefilename) values(?,?)';
        let [result, fields] = await connection.query(sql, [postid, filename]);
        res.send('ok');
    }catch(err){
        console.error(err);
    }
});

let paging = {
    page : 1, // 현재 페이지
    displayRow : 3, // 한 스크롤에 보여줄 피드 갯수
    startNum : 0,
    endNum : 0,
    calPaging : function(){
        this.startNum = (this.page-1) * this.displayRow;
        this.endNum = this.page * this.displayRow;
        console.log('start end', this.startNum+" "+this.endNum);
    }
}


router.get('/getPostList/:page/:word', async(req, res)=>{
    if(req.params.page != undefined){
        paging.page = req.params.page;
    }else{
        paging.page = 1;
    }
    paging.calPaging();
    try{
        const connection = await getConnection();
        if(req.params.word != 'n'){
            let sql = 'select * from hashtag where word=?';
            let [rows, fields] = await connection.query(sql, [req.params.word]);
            if ( rows.length >= 1){
                let wordid = rows[0].id;
                sql = 'select * from post where id in (select postid from post_hash where hashid=? ) order by id desc limit ? offset ?';
                let [rows2, fields2] = await connection.query(sql, [wordid, paging.displayRow, paging.startNum]);
                res.send({postList:rows2, paging});
            } else{
                const sql = 'select * from post order by id desc limit ? offset ?';
                let [rows, fields] = await connection.query(sql, [paging.displayRow, paging.startNum]);
                res.send({postList:rows, paging});
            }
        } else {
            const sql = 'select * from post order by id desc limit ? offset ?';
            let [rows, fields] = await connection.query(sql, [paging.displayRow, paging.startNum]);
            res.send({postList:rows, paging});
        }
    }catch(err){
        console.error(err);
    }
});





router.get('/getImages/:postid', async (req, res)=>{
    try{
        const connection = await getConnection();
        const sql = 'select * from images where postid=?'
        let [ rows, fields ] = await connection.query(sql, [req.params.postid]);
        res.send(rows);
    }catch(err){
        console.error(err);
    }
})

router.get('/getLikes/:postid', async (req, res)=>{
    try{
        const connection = await getConnection();
        const sql = 'select * from likes where postid=?'
        let [ rows, fields ] = await connection.query(sql, [req.params.postid]);
        res.send(rows);
    }catch(err){
        console.error(err);
    }
})

router.post('/addLike/', async (req, res)=>{
    const { postid, likenick } =req.body
    try{
        const connection = await getConnection();
        let sql = 'select * from likes where postid=? and likenick=?'
        let [ rows, fields ] = await connection.query(sql, [postid, likenick]);
        if(rows.length >= 1){
            sql = 'delete from likes where postid=? and likenick=?'
            let [ result, fields ] = await connection.query(sql, [postid, likenick]);
        } else{
            sql = 'insert into likes(postid, likenick) values(?,?)'
            let [ result, fields ] = await connection.query(sql, [postid, likenick]);
        }
        res.send('ok');

    } catch(err){
        console.error(err);
    }
})

router.get('/getReplys/:postid', async (req, res)=>{
    try{
        const connection = await getConnection();
        const sql = 'select * from reply where post=? order by id desc'
        let [ rows, fields ] = await connection.query(sql, [req.params.postid]);
        res.send(rows);
    }catch(err){
        console.error(err);
    }
})

router.post('/addReply', async(req, res)=>{
    const { post, writer, content } = req.body;
    try{
        const connection = await getConnection();
        const sql = 'insert into reply(post, writer, content) value(?,?,?)'
        let [result, fields ] = await connection.query(sql, [post, writer, content ]);
        res.send('ok');
    }catch(err){console.error(err);}
})

router.delete('/deleteReply/:id', async(req, res)=>{
    try{
        const connection = await getConnection();
        const sql = 'delete from reply where id=?';
        let [result, fields ] = await connection.query(sql, [req.params.id]);
        res.send('ok');

    }catch(err){console.error(err);}
})

router.get('/getMyPost', async(req, res)=>{
    try{
        const connection = await getConnection();
        // 로그인 유저의 닉네임으로 포스트의 작성자 검색을 합니다.
        let sql = 'select * from post where writer=?'
        let [rows1, fields ] = await connection.query(sql, [req.user.nickname]);

        // 검색된 포스트의 아이디들로 반복실행하여 images 테이블에서 postid를 대상으로 검색
        let imgList = [];
        sql = 'select * from images where postid=?'
        for(let i=0; i<rows1.length; i++){
            let [rows2, fields2 ] = await connection.query(sql, rows1[i].id)
            // 검색된 이미지들의 첫번째만 배열에 담습니다. 
            imgList.push(rows2[0].savefilename);
        }
        res.send({postList:rows1, imgList})
    }catch(err){console.error(err)}
})

module.exports = router;