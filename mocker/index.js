const express = require('express')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
const port = 9001;

app.use(cookieParser());
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
app.use(multipart());//FormData


app.post('/security/userInfo', (req, res) => {
    if (req.cookies && req.cookies.user && req.cookies.user != "") {
        return res.json(JSON.parse(req.cookies.user)).end();
    } else {
        return res.sendStatus(401).end();
    }
});


app.post('/security/login', (req, res) => {
    const { account, password } = req.body;
    if (password != 'hello') {
        return res.status(500).json({
            msg: '用户名或密码错误！'
        });
    } else {
        res.cookie("user", JSON.stringify({
            id: '001',
            account: account,
            name: '余乐'
        }), { maxAge: 30000, httpOnly: true }).json({}).end();

    }

});

app.post('/security/logout', (req, res) => {
    return res.cookie("user", "").json({}).end();
});




app.listen(port, () => console.log(`mocker app listening on port ${port}!`));