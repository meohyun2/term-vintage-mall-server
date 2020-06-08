const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');
const jwt = require('../../module/jwt');

Shop = {
  newItems : (product) => {
    return new Promise(async(resolve,reject)=>{
      // 토큰 인증, 클라이언트는 무효하다면 로그인으로 리디렉션할것. (참고로 이건 관리자 아이디)
      // const verifiedToken = jwt.verify(jwt);
      // if(verifiedToken==-3 || verifiedToken==-2){
      //   resolve({
      //     code : statusCode.UNAUTHORIZED,
      //     json : utils.successFalse(statusCode.UNAUTHORIZED,resMessage.UNAUTHORIZED)
      //   })
      // }

      // const getMyInfoSQL =`select id,phone_number,birthday,sex from user where id = '${verifiedToken.id}'`;
      const registration_date = moment().format('YYYY[-]MM[-]DD');
      const newItemSQL = `insert into product(product_name,product_price,product_regdate,product_type,vintage_type) values('${product.product_name}',${product.product_price},'${registration_date}',${product.product_type},${product.vintage_type});`;
      const newItemResult = await pool.queryParam_None(newItemSQL);
      
      if(!newItemResult){
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        })
      }

      resolve({
        code: statusCode.OK,
        json: utils.successTrue(statusCode.OK,resMessage.NEW_ITEM_REGIST_SUCCESS)
      })
    });
  },
  PagingItems : (index,type) => {
    // 토큰 인증 진행 하지 않음, 누구나 페이징 가능
    return new Promise(async (resolve,reject)=>{
      if(index == 1){
        var Offset = 0;
      }else{
        var Offset = (index-1) * 10;
      }
      const pagingSQL = `select * from (select * from product join vintage_type where product.vintage_type = vintage_type.vintage_idx && vintage_type.type_name = "${type}")as P order by P.product_idx asc limit 10 offset ${Offset};`;
      const pagingResult = await pool.queryParam_None(pagingSQL);

      if(!pagingResult){
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        })
      }

      resolve({
        code : statusCode.OK,
        json : utils.successTrue(statusCode.OK,resMessage.PAGING_SHOP_SUCCESS,pagingResult)
      })
    });
  },
  RegistItems : (item) => {
    return new Promise(async (resolve,reject)=>{
      // 토큰 인증, 클라이언트는 무효하다면 로그인으로 리디렉션할것. (참고로 이건 관리자 아이디)
      // const verifiedToken = jwt.verify(jwt);
      // if(verifiedToken==-3 || verifiedToken==-2){
      //   resolve({
      //     code : statusCode.UNAUTHORIZED,
      //     json : utils.successFalse(statusCode.UNAUTHORIZED,resMessage.UNAUTHORIZED)
      //   })
      // }

      // const getMyInfoSQL =`select id,phone_number,birthday,sex from user where id = '${verifiedToken.id}'`;
      const registItemSQL = `select * from product where product.product_idx = ${item}`;
      const registItemsResult = await pool.queryParam_None(registItemSQL);
      
      if(!registItemsResult){
        resolve({
          code : statusCode.NO_CONTENT,
          json : utils.successFalse(statusCode.NO_CONTENT,resMessage.NULL_VALUE)
        })
      }
      resolve({
        code : statusCode.OK,
        json : utils.successTrue(statusCode.OK,resMessage.SHOP_ITEM_REGIST_SUCCESS,registItemsResult)
      })
    });
  }
}

module.exports = Shop;