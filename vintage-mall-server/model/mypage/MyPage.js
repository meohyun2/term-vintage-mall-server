const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');
const jwt = require('../../module/jwt');

MyPage = {
  getMyPage : (token) => {
    return new Promise(async(resolve,reject)=>{
      // 토큰 인증, 클라이언트는 무효하다면 로그인으로 리디렉션할것.
      // const verifiedToken = jwt.verify(jwt);
      // if(verifiedToken==-3 || verifiedToken==-2){
      //   resolve({
      //     code : statusCode.UNAUTHORIZED,
      //     json : utils.successFalse(statusCode.UNAUTHORIZED,resMessage.UNAUTHORIZED)
      //   })
      // }

      // const getMyInfoSQL =`select id,phone_number,birthday,sex from user where id = '${verifiedToken.id}'`;
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
      // 토큰 인증, 클라이언트는 무효하다면 로그인으로 리디렉션할것.
      // const verifiedToken = jwt.verify(jwt);
      // if(verifiedToken==-3 || verifiedToken==-2){
      //   resolve({
      //     code : statusCode.UNAUTHORIZED,
      //     json : utils.successFalse(statusCode.UNAUTHORIZED,resMessage.UNAUTHORIZED)
      //   })
      // }
  
      // const getMyInfoSQL =`select id,phone_number,birthday,sex from user where id = '${verifiedToken.id}'`;
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