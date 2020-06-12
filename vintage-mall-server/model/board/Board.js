const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');
const moment = require('moment');

Board = {
    // 페이징 하기
    getAllBoard : (userIdx) => {
        return new Promise(async (resolve,reject)=>{
            const Offset=0;
            const getPageBoard =  `SELECT board_idx,title,text,write_date,id FROM board join user where writer=user_idx limit 10 offset=${Offset}`;
            const getAllBoardResult = await pool.queryParam_None(getPageBoard);
            if(!getAllBoardResult){
                // 연동 실패
                resolve({
                    code : statusCode.DB_ERROR,
                    json : utils.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR)
                });
                return;
            } else {
                console.log(getAllBoardResult);
                resolve({
                    code : statusCode.OK,
                    json : utils.successTrue(statusCode.OK,resMessage.BOARD_REGIST_ALL_SUCCESS,getAllBoardResult)
                });
                return;
            }
        });
    },
    getOneBoard : (boardIdx) => {
        return new Promise(async (resolve,reject)=>{
            const getOneBoard = `SELECT * FROM board WHERE board_idx = ${boardIdx};`;
            const getOneBoardResult = await pool.queryParam_None(getOneBoard);

            if(!getOneBoardResult){
                // 연동 실패
                resolve({
                    code : statusCode.DB_ERROR,
                    json : utils.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR)
                });
                return;
            } else {
                // 연동 성공
                resolve({
                    code : statusCode.OK,
                    json : utils.successTrue(statusCode.OK,resMessage.BOARD_REGIST_ONE_SUCCESS,getOneBoardResult)
                });
                return;
            }
        });
    },
    createBoard : (userIdx,boardString) => {
        return new Promise(async (resolve,reject)=> {

            const createBoard = `INSERT INTO Board(writerIdx,date) VALUES (${userIdx},'${moment().format('YYYY-MM-DD HH:MM:SS')}',${boardString});`;
            const insertBoard = await pool.queryParam_None(createBoard);
            
            if(insertBoard === undefined){
                resolve({
                    code : statusCode.DB_ERROR,
                    json : utils.successFalse(statusCode.DB_ERROR,resMessage.DB_ERROR)
                })
            }else{
                resolve({
                    code : statusCode.OK,
                    json : utils.successTrue(statusCode.OK,resMessage.NEW_BOARD_SUCCESS,resMessage.NEW_BOARD_SUCCESS)
                })
            }
        });
    },
    updateBoard : (boardIdx,newBoardString) => {

        return new Promise(async (resolve,reject)=>{
            const updateBoard = `UPDATE board SET text = '${newBoardString}' WHERE board_idx = ${boardIdx}`;
            const updateBoardResult = await pool.queryParam_None(updateBoard);
    
            if(!updateBoardResult){
                resolve({
                    code : statusCode.DB_ERROR,
                    json : utils.successFalse(statusCode.DB_ERROR,resMessage.DB_ERROR)
                });
            }else{
                resolve({
                    code : statusCode.OK,
                    json : utils.successTrue(statusCode.OK,resMessage.UPDATE_BOARD_SUCCESS,"업데이트 성공!")
                })
            }
        });
    },
    deleteBoard : (boardIdx) => {
        return new Promise(async(resolve,reject)=>{

            const deleteBoard = `DELETE FROM Board WHERE boardIdx = ${boardIdx};`;
            const deleteBoardResult = await pool.queryParam_None(deleteBoard);

            if(deleteBoardResult === undefined){
                resolve({
                    code : statusCode.DB_ERROR,
                    json : utils.successFalse(statusCode.DB_ERROR,resMessage.DB_ERROR)
                })
            }else{
                resolve({
                    code : statusCode.OK,
                    json : utils.successTrue(statusCode.OK,resMessage.DELETE_BOARD_SUCCESS,resMessage.DELETE_BOARD_SUCCESS)
                })
            }
        });
    }
}

module.exports = Board;