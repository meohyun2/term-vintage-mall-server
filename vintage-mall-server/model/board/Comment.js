const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');

Comment = {
  newComment : (userIdx,boardIdx,text) => {
    return new Promise(async(resolve,reject)=>{
      const comment_date = moment().format('YYYY[-]MM[-]DD[ ]HH[:]MM[:]SS');
      const newCommentSQL = `insert into comment(user_from,board_to,text,comment_date) values(${userIdx},${boardIdx},'${text}','${comment_date}');`;
      const newCommentResult = await pool.queryParam_None(newCommentSQL);

      if(!newCommentResult){
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        })
      }

      resolve({
        code: statusCode.OK,
        json: utils.successTrue(statusCode.OK,resMessage.NEW_COMMENT_SUCCESS)
      })
    })
  },
  getComment : (boardIdx) => {
    return new Promise(async(resolve,reject)=>{
      const getCommentSQL = `select * from comment where board_to = ${boardIdx}`;
      const getCommentResult = await pool.queryParam_None(getCommentSQL);

      if(!getCommentResult){
        resolve({
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        })
      }

      resolve({
        code : statusCode.OK,
        json : utils.successTrue(statusCode.OK,resMessage.GET_COMMENT_SUCCESS,getCommentResult)
      })
    })
  },
  deleteComment : (comment_idx) => {
    return new Promise(async(resolve,reject)=>{
      const deleteCommentSQL = `delete from comment where comment_idx = ${comment_idx}`;
      const deleteCommentResult = await pool.queryParam_None(deleteCommentSQL);

      if(!deleteCommentResult){
        resolve({
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,resMessage.NULL_VALUE)
        })
      }

      resolve({
        code: statusCode.OK,
        json: utils.successTrue(statusCode.OK,resMessage.DELETE_BOARD_SUCCESS)
      })
    })
  }
}

module.exports = Comment;