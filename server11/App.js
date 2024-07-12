const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const mysql = require('mysql2/promise');

async function getConnection(){
    let connection = await mysql.createConnection(
        {
            host : 'localhost',
            user : 'root',
            password : 'adminuser',
            database : 'board'
        }
    );
    return connection;
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.send("<h1>Hello World</h1>");
})

app.get('/getMembers', async(req, res, next)=>{

    try{
        const connection = await getConnection();
        const sql = 'select * from member';
        const [rows, fields] = await connection.query(sql);
        res.send(rows);
    }catch(err){
        next(err);
    }
});

app.post('/join', async (req, res, next)=>{
    const{id, pwd, name, phone, email} = req.body;
    console.log("클라이언트에서 전송된 내용입니다.");
    console.log(id, pwd, name, phone, email);

    try{
        const connection = await getConnection();
        const sql = 'insert into member(userid, pwd, name, email, phone) values(?,?,?,?,?)';
        const [result, fields] = await connection.query(sql, [id, pwd, name, email, phone]);
        res.send('ok');
    }catch(err){
        next(err);
    }

    
});

app.listen(port, ()=>{console.log(`${port} port Server Open...`)});