var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const MyPage = require('../../model/mypage/MyPage');

const dummyInput = {
  birthday : '1992-11-15',
  sex : 1,
  phone_number : '010-1294-1234'
}

//마이 페이지 조회
router.get('/',(req,res)=>{
  MyPage.getMyPage()
  .then(({code,json})=> {
    res.status(code).send(json);
  })
  .catch((err)=> {
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
});

//나의 정보 수정
router.post('/',(req,res)=>{
  MyPage.updateMyPage(dummyInput)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
})

module.exports = router;