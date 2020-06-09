var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const User = require('../../model/user/user');

const dummyInput = {
  id : 'meohyun2',
  pwd : 'meomeo',
  birthday : '1996-12-19',
  sex : 1,
  phone_number : '010-8894-6242'
}

const dummyLogin = {
  id : 'meohyun2',
  pwd : 'meomeo'
}

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
  // 후에 로그인 폼 처리 방식
  // var id = req.body.user_id;
  // var pwd = req.body.user_pwd;
  User.logIn(dummyLogin.id,dummyLogin.pwd)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
})

module.exports = router;