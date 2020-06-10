var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const User = require('../../model/user/user');

//회원가입
router.post('/signUp',(req,res)=>{
  const UserBody = req.body;
  console.log(UserBody);
  User.signUp(UserBody)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
});

//로그인
router.post('/logIn',(req,res)=>{
  var id = req.body.id;
  var pwd = req.body.pwd;
  User.logIn(id,pwd)
  .then(({code,json})=>{
    console.log(json);
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
})

//토큰 인증
router.post('/auth',(req,res)=>{
  const token = req.body.token;
  User.authCheck(token)
  .then(({code,json})=>{
    res.status(code).send(json)
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
  })
})

module.exports = router;