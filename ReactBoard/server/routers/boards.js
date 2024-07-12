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
        database : 'board'
    });
    return connection;
}

let paging = {
    page:1,
    totalCount:0,
    beginPage:0,
    endPage:0,
    displayRow:10,
    displayPage:10,
    prev:false,
    next:false,
    startNum:0,
    endNum:0,
    calPaging:function(){
        this.endPage = Math.ceil(this.page/this.displayPage)*this.displayPage;
        this.beginPage = this.endPage - (this.displayPage - 1);
        let totalPage = Math.ceil(this.totalCount/this.displayRow);
        if(totalPage<this.endPage){
            this.endPage = totalPage;
            this.next = false;
        }else{
            this.next = true;
        }
        this.prev = (this.beginPage == 1)?false:true;
        this.startNum = (this.page - 1)*this.displayRow+1;
        this.endNum = this.page*this.displayRow;
        console.log(this.beginPage+" "+this.endPage+" "+this.startNum+" "+this.endNum+" "+this.totalCount);
    }
}

router.get('/getBoardList/:page', async (req, res, next)=>{
    if( req.params.page != undefined){
        paging.page = req.params.page;
        req.session.page = req.params.page;
    } else if(req.session.page != undefined){
        paging.page = req.session.page;
    } else{
        req.session.page = '';
    }

    try{
        const connection = await getConnection();
        let sql = 'select * from board';
        let [rows, fields] = await connection.query(sql);
        paging.totalCount = rows.length;
        paging.calPaging();

        sql = 'select * from board order by num desc limit ? offset ?';
        let [rows2, fields2] = await connection.query(sql, [paging.displayRow, paging.startNum-1]);
        res.send({boardList:rows2, paging});
    }catch(err){
        console.error(err);
    }
})

router.get('/getBoard/:num', async (req, res)=>{
    try{
        const connection = await getConnection();

        let sql = 'update board set readcount=readcount+1 where num=?';
        const[ result, fields3] = await connection.query(sql, [req.params.num]);

        sql = 'select * from board where num=?';
        const [rows, fields] = await connection.query(sql, [req.params.num]);

        sql = 'select * from reply where boardnum=? order by replynum desc';
        const [rows2, fields2] = await connection.query(sql, [req.params.num]);

        res.send({board:rows[0], replyList:rows2});
    }catch(err){
        console.error(err);
    }
});

router.get('/getReplyList/:num', async(req, res)=>{
    try{
        const connection = await getConnection();
        const sql = 'select * from reply where boardnum=? order by replynum desc';
        const [rows, fields] = await connection.query(sql, [req.params.num]);
        res.send(rows);
    }catch(err){
        console.error(err);
    }
})


router.post('/addReply', async(req, res)=>{
    const { boardnum, userid, content } = req.body;
    try{
        const connection = await getConnection();
        const sql = 'insert into reply(boardnum, userid, content) values (?,?,?)';
        const [result, fields] = await connection.query(sql, [ boardnum, userid, content])
        res.send('ok');
    }catch(err){
        console.error(err)
    }
})

router.delete('/deletereply/:replynum', async(req,res)=>{
    try{
        const connection = await getConnection();
        let sql = 'delete from reply where replynum=?';
        const[result, fields] = await connection.query(sql, [req.params.replynum]);
        res.send('ok');
    }catch(err){
        console.error(err);
    }
})

try{

}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
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
            saveFileName : req.file.filename,
            image : req.file.originalname,

        }
    )
})

router.post('/insertBoard', async (req, res)=>{
    const {userid, email, pass, title, content, image, saveFileName} = req.body;
    try{
        const connection = await getConnection();
        const sql = 'insert into board(userid, email, pass, title, content, image, savefilename) values (?,?,?,?,?,?,?)';
        const [result, fields] = await connection.query(sql, [userid, email, pass, title, content, image, saveFileName])
        res.send('ok');

    }catch(err){
        console.error(err);
    }
})

router.post('/updateBoard/:num', async(req, res)=>{
    const {title, content, image, saveFileName } = req.body;
    try{
        const connection = await getConnection();
        const sql = 'update board set title=?, content=?, image=?, saveFileName=? where num=?';
        const[result, fields] = await connection.query(sql, [title, content, image, saveFileName, req.params.num]);
        res.send('ok');
    }catch(err){
        console.error(err);
    }
})

router.delete('/deleteBoard/:num', async(req, res)=>{
    try{
        const connection = await getConnection();
        const sql = 'delete from board where num=?';
        const[result, fields] = await connection.query(sql, [req.params.num]);
        res.send('ok');
    }catch(err){
        console.error(err);
    }
})

module.exports = router;