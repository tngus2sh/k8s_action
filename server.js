// DAY1
// 서버를 띄우기 위한 기본셋팅
// 1. 아까 설치한 라이브러리를 첨부
const express = require('express');
// 2. 새로운 객체 생성
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// ===========================================================================
// mongodb 연결
// ===========================================================================
var db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://hello_user_25:dlswjd89@cluster0.0sqag3s.mongodb.net/?retryWrites=true&w=majority', function(error, client){
    if(error){return console.log(error);}

    db = client.db('todoapp');
    // db.collection('post').insertOne({이름 : 'John', 나이 : 20, _id : 100}, function(err, result){
    //     console.log('save success');
    // });

    app.listen(3000, function(){
        console.log('listening on 3000');
    });    
});


// ===========================================================================
// 어떤 사람이 /add라는 경로로 post 요청을 하면, 
// 데이터 2개(날짜, 제목)를 보내주는데,
// 이때 'post'라는 이름을 가진 collection에 두개 데이터를 저장하기
// id는 총게시물개수 + 1
// ===========================================================================

app.post('/add', function(req, res){
    res.send('전송완료');
    console.log(req.body.date);
    console.log(req.body.title);
    // counter라는 데이터를 모두 찾는다 -> find(), 하나만 찾는다 -> findOne()
    // name이 게시물갯수인 것을 찾아주세요.
    db.collection('counter').findOne({name : '게시물갯수'}, function(err, result){
        console.log(result.totalPost);
        totalPost = result.totalPost;
        db.collection('post').insertOne({ _id : totalPost + 1,제목 : req.body.title, 날짜 : req.body.date}, function(err, result){
            console.log('save success');
            // counter라는 collection에 있는 totalPost 라는 항목도 1 증가시켜야함.
            // 전부 수정 -> update({어떤 데이터 수정할지}, {수정값}, function(){}), 하나만 수정 -> updateOne({어떤 데이터 수정할지}, {수정값}, function(){})
            // operator(연산자) : $set(변경), $inc(증가), $min(기존값보다 적을 때만 변경), $rename(key값 이름변경)
            // {$set : {totalPost : 바꿀 값}}
            // {$inc : {totlaPost : 기존값에 더해줄 값}}
            db.collection('counter').updateOne({name: '게시물갯수'}, { $inc : {totalPost: 1}}, function(err, result){
                if(err){return console.log(err);}
            });
        });
    });
});


// ===========================================================================
// /list로 GET요청으로 접속하면
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML 보여줌
// ===========================================================================

// ===========================================================================
// ** 수정할 부분
// ===========================================================================
app.get('/list', function(req, res){
    // .find().toArray() : 모든 데이터 찾아오기
    console.log('업데이트 전');
//     db.collection('post').find().toArray(function(err, result){
//         console.log(result);
//         // ejs파일들은 view폴더에 넣어야함
//         // ejs에 result 넣기
//         res.render('list.ejs', { posts : result });
//     });
});

// ===========================================================================

// // .listen(서버띄울 포트번호, 띄운 후 실행할 코드) : 컴퓨터에 서버를 열 수 있음
// app.listen(8080, function(){
//     console.log('listening on 8080');
// });

// 누군가가 /pet으로 방문을 하면
// pet 관련된 안내문을 띄워주자

// app.get(경로, function(요청, 응답){})
app.get('/pet', function(req, res){
    res.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

// 숙제
app.get('/beauty', function(req, res){
    res.send('뷰티 용품');
});

// '/'는 home을 의미
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// 함수 안에 함수 : 콜백 함수
app.get('/write', function(req,res){
    res.sendFile(__dirname + '/write.html');
});

// 신문법
// app.get('/beauty', (req, res) => {});

// 어떤 사람이 /add 경로로 POST 요청을 하면 ~~을 해주세요
// input에 적은 정보는 req에 저장되어있다.
// app.post('/add', function(req, res){
//     res.send('전송완료');
//     console.log(req.body);
// });
