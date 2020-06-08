const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');
const jwt = require('../../module/jwt');

MyPage = {
  getMyPage : (index) => {
    return new Promise(async(resolve,reject)=>{
      const getMyInfoSQL =`select id,phone_number,birthday,sex from user where id = 'meohyun2'`;
      const MyInfoResult = await pool.queryParam_None(getMyInfoSQL);
      if(!MyInfoResult){
        resolve({
          code : statusCode.DB_ERROR,
          json : utils.successTrue(statusCode.DB_ERROR,)
        })
      }
      const jsonInfoResult = JSON.parse(JSON.stringify(MyInfoResult));
      console.log(jsonInfoResult);
      resolve({
        code : statusCode.OK,
        json : utils.successTrue(statusCode.OK,resMessage.MYPAGE_GET_SUCCESS,jsonInfoResult)
      })
    })
  },

  updateMyPage : (updateData) => {
    return new Promise(async(resolve,reject)=>{
      const getMyPageSQL =`update user set birthday = '${updateData.birthday}', sex = '${updateData.sex}', phone_number = '${updateData.phone_number}' where id = 'meohyun2'`;
      const myPageResult = await pool.queryParam_None(getMyPageSQL); 
  
      if(!myPageResult){
        resolve({
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        })
      }else{
        resolve({
          code : statusCode.OK,
          json : utils.successTrue(statusCode.OK,resMessage.MYPAGE_GET_SUCCESS,'후에 토큰 돌려 줄 예정')
        })
      }
    });
  }
}

module.exports = MyPage;