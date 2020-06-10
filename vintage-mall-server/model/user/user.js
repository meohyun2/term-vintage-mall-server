const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');
const jwt = require('../../module/jwt');
const encrypt = require('../../module/encryption');

User = {
  logIn : (id,pwd) => {
    return new Promise(async(resolve,reject)=>{
      console.log(id,pwd);
      const matchSQL = 
      `select id,pwd,salt from user where id ='${id}'`;
      const matchSQLResult = await pool.queryParam_None(matchSQL);
      if(!matchSQLResult){
        resolve({
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,resMessage.LOGIN_FAIL)
        });
      }
      const JsonResult = JSON.parse(JSON.stringify(matchSQLResult));
      console.log(JsonResult[0].id);
      // input value hashing
      const hashedInput = await encrypt.encryptWithSalt(pwd,JsonResult[0].salt);
      console.log(hashedInput.hashed+',와 이걸 비교'+JsonResult[0].pwd);
      if(hashedInput.hashed==JsonResult[0].pwd){
        //로그인 성공, 토큰 발급
        const token = jwt.sign(JsonResult[0].id);
        console.log(token);
        resolve({
          code : statusCode.OK,
          json : utils.successTrue(statusCode.OK,resMessage.LOGIN_SUCCESS,{token:token})
        })
      }else{
        resolve({
          code : statusCode.UNAUTHORIZED,
          json : utils.successFalse(statusCode.UNAUTHORIZED,resMessage.LOGIN_FAIL)
        })
      }
    })
  },
  signUp : (user) => {
    return new Promise(async(resolve,reject)=>{
      if(!user.id||!user.pwd||!user.phone_number||!user.birthday||!user.sex){
        resolve({
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        });
      }
      const registration_date = moment().format('YYYY[-]MM[-]DD');
      const encryptResult = await encrypt.encrypt(user.pwd);
      const SignUpSQL = `INSERT INTO user(id,pwd,salt,phone_number,birthday,registration_date,sex) values('${user.id}','${encryptResult.hashed}','${encryptResult.salt}','${user.phone_number}','${user.birthday}','${registration_date}','${user.sex}');`;
      const SignUpResult = await pool.queryParam_None(SignUpSQL);
      console.log(SignUpResult);
      if(SignUpResult.affectedRows==1){
        resolve({
          code : statusCode.OK,
          json : utils.successTrue(statusCode.OK,resMessage.SIGNIN_SUCCESS)
        });
      }else{
        resolve({
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,resMessage.SIGNIN_FAIL)
        });
      }
    })
  },
  authCheck : (token) =>{
    return new Promise(async(resolve,reject)=>{
      const tokenFlag = jwt.verify(token);
      if(tokenFlag==-2){
        // expired token
        const newToken = jwt.sign(token.decode().id);
        resolve({
          code : statusCode.OK,
          json : utils.successTrue(statusCode.OK,resMessage.RE_AUTHORIZATION_SUCCESS,{token:newToken})
        })
      }else if(tokenFlag==-3){
        // invalid token
        resolve({
          code : statusCode.UNAUTHORIZED,
          json : utils.successFalse(statusCode.UNAUTHORIZED,resMessage.UNAUTHORIZED)
        })
      }else{
        resolve({
          code : statusCode.OK,
          json : utils.successTrue(statusCode.OK,resMessage.AUTHORIZATION_SUCCESS,token)
        })
      }
    })
  }
}

module.exports = User;