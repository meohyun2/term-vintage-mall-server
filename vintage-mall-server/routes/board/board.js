var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const Board = require('../../model/board/Board');
const Comment = require('../../model/board/Comment');

const dummyComment = {
    userIdx:1,
    board_idx:1,
    text:"님아 이런것좀 하지마요!"
}

//게시물 전체 조회
router.get('/',async(req,res)=>{
    // const userIdx = req.decoded.idx;
    Board.getAllBoard(1)
    .then(({code,json}) => {
        res.status(code).send(json);
    })
    .catch((err)=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
    });
});
//게시물 한 개 조회
router.get('/:board_idx',(req,res)=>{
    // const userIdx = req.decoded.idx;
    const {board_idx} = req.params
    console.log(board_idx)
    // 이후에  => req.query.board_idx 으로 접근
    Board.getOneBoard(req.params.board_idx)
    .then(({code,json}) => {
        res.status(code).send(json);
    })
    .catch((err)=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
    });
});
//게시물 등록
router.post('/',(req,res)=>{
    const userIdx = 1; // 차후 토큰 값에서 받아와야!
    const boardString = 'Dummy data for Create API';
    Board.createBoard(userIdx,boardString)
    .then(({code,json})=> {
        res.status(code).send(json);
    })
    .catch((err)=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
    });

});
//게시물 수정
router.put('/',(req,res)=>{
    // 토큰 인증 예정 ( 미들웨어 )
    const boardIdx = 100;
    const newBoardString = 'update board data'
    Board.updateBoard(boardIdx,newBoardString)
    .then(({code,json})=>{
        res.status(code).send(json);
    })
    .catch((err)=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
    });
});
//게시물 삭제
router.delete('/:board_idx',(req,res)=>{
    // 토큰 인증 예정 ( 미들웨어 )
    Board.deleteBoard(req.params.board_idx)
    .then(({code,json})=>{
        res.status(code).send(json);
    })
    .catch((err)=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
    });
});

//댓글 등록
router.post('/comment',(req,res)=>{
    Comment.newComment(dummyComment.userIdx,dummyComment.board_idx,dummyComment.text)
    .then(({code,json})=>{
        res.status(code).send(json);
    })
    .catch((err)=>{
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(resMessage.INTERNAL_SERVER_ERROR);
    })
});

//게시물 댓글 조회
router.get('/:board_idx/comment',(req,res)=>{
    const board_idx = req.params.board_idx;
    console.log(board_idx);
    Comment.getComment(board_idx)
    .then(({code,json})=>{
        res.status(code).send(json);
    })
    .catch((err)=>{
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(resMessage.INTERNAL_SERVER_ERROR);
    })
})

//게시물 댓글 삭제
router.delete('/comment/:comment_idx',(req,res)=>{
    const comment_idx = req.params.comment_idx;
    console.log(comment_idx);
    Comment.deleteComment(comment_idx)
    .then(({code,json})=>{
        res.status(code).send(json);
    })
    .catch((err)=>{
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(resMessage.INTERNAL_SERVER_ERROR);
    })
})

module.exports = router;