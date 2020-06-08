var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const Transaction = require('../../model/transaction/transaction');

const dummyTransaction = {
  product_id : 4,
  buyer : 1
}

// 트랜젝션 입력
router.post('/',(req,res)=>{
  Transaction.newTransaction(dummyTransaction.product_id,dummyTransaction.buyer)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  })
})

// 나의 트랜잭션 조회
router.get('/',(req,res)=>{
  Transaction.getMyTransaction('meohyun2')
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR)
  })
})

module.exports = router;