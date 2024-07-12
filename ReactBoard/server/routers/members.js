const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
async function getConnection(){
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'adminuser',
        database : 'board'
    });
    return connection;
}

router.post('/login', async(req, res, next)=>{
    console.log(req.body);
    const { userid, pwd } = req.body;
    try{
        const connection = await getConnection();
        const sql = 'select * from member where userid=?'
        const [rows, fields] = await connection.query(sql, [userid]);
        if(rows.length >=1 ){
            if (rows[0].pwd == pwd){
                const uniqInt = Date.now();
                req.session[uniqInt] = rows[0];
                res.cookie('session', uniqInt, {httpOnly : true, path : '/'});
                return res.send({message:'ok'});

            }else{
                return res.send({message:"패스워드가 다릅니다."});
            }
        } else{
            return res.send({message:'아이디가 없습니다.'});
        }
    }catch(err){
        console.error(err);
    }
});

router.get('/logout', (req, res)=>{
    if(req.cookies.session){
        delete req.session[req.cookies.session];
        res.clearCookie('session', req.cookies.session, {httpOnly:true, path : 'http://localhost:3000/'});
    }else { 
        req.session.destroy();  //세션 쿠키 한번에 삭제
    }
    res.redirect('http://localhost:3000/');
});

router.post('/join', async (req, res)=>{
    const {userid, pwd, name, email, phone} = req.body;
    try{
        const connection = await getConnection();
        const sql = 'insert into member(userid, pwd, name, email, phone) values (?,?,?,?,?)';
        const [result, fields] = connection.query(sql, [userid, pwd, name, email, phone]);
        res.send({message : 'ok'});
    }catch(err){
        console.error(err);
        res.send({message : 'no'});
    }

})

router.get('/getLoginUser', (req, res)=>{
    const loginUser = req.session[req.cookies.session];
    res.send( loginUser );
})

router.post('/updateMember', async (req, res)=>{
    const { userid, pwd, name, email, phone } = req.body;
    try{
        const connection = await getConnection();
        const sql = 'update member set pwd=?, name=?, email=?, phone=? where userid=?';
        const[result, fields] = await connection.query(sql, [pwd, name, email, phone, userid]);
        req.session[req.cookies.session] = {userid, pwd, name, email, phone};
        res.send({message:'ok'});
    }catch(err){
        console.error(err);
    }
});


module.exports = router;