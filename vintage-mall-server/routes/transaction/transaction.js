var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const Transaction = require('../../model/transaction/transaction');
const jwt = require('../../module/jwt');

// 트랜젝션 입력
router.post('/',(req,res)=>{
  const product_id = req.body.product_idx;
  const buyer = jwt.verify(req.body.token).id;
  Transaction.newTransaction(product_id,buyer)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
})

// 나의 트랜잭션 조회
router.get('/',(req,res)=>{
  const token = req.headers["authorization"].replace("Bearer ","");
  const id = jwt.verify(token).id;
  Transaction.getMyTransaction(id)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR)
  })
})

module.exports = router;