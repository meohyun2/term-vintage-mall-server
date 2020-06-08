const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');

Transaction = {
  //새로운 트랜젝션 생성
  newTransaction : (product_id,buyer)=> {
    return new Promise(async(resolve,reject)=>{
      const transaction_date = moment().format('YYYY[-]MM[-]DD[ ]HH[:]MM[:]SS');
      console.log(transaction_date);
      const newTransactionSQL = `insert into transaction(product_id,transaction_date,buyer) values(${product_id},'${transaction_date}',${buyer});`;
      const newTransactionResult = await pool.queryParam_None(newTransactionSQL);
      
      if(!newTransactionResult){
        resolve({
          code : statusCode.NOT_FOUND,
          json : utils.successFalse(statusCode.NOT_FOUND,resMessage.NULL_VALUE)
        })
      }

      resolve({
        code : statusCode.OK,
        json : utils.successTrue(statusCode.OK,resMessage.NEW_TRANSACTION_SUCCESS)
      })
    });
  },
  // 내 트랜잭션 가져오기
  getMyTransaction : (user_idx) => {
    return new Promise(async(resolve,reject)=>{
      const getMyTransactionSQL = `select product_id,transaction_date from transaction join user where buyer = (select user_idx from user where id = 'meohyun2')`;
      
      const getMyTransactionResult = await pool.queryParam_None(getMyTransactionSQL);
      if(!getMyTransactionResult){
        resolve({
          code : statusCode.NOT_FOUND,
          json : utils.successFalse(statusCode.NOT_FOUND,resMessage.DB_ERROR)
        })
      }else{
        resolve({
          code: statusCode.OK,
          json: utils.successTrue(statusCode.OK,resMessage.GET_MY_TRANSACTION_SUCCESS,getMyTransactionResult)
        })
      }
    });
  }
}

module.exports = Transaction