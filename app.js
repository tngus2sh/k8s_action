import express from 'express';
import path from 'path';
import homeRouter from './routes/home/index.js';
import ejs from 'ejs';
var app = express();

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', process.env.HOST_PORT);
app.set('host', process.env.HOST_NAME);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname)));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var router = express.Router();

// homeRouter 연결
app.use('/', homeRouter);

// app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

app.all('*', function(req, res){
	res.status(404).send("<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>");
});

export default app
