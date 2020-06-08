var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const authUtils = require('../../module/utils/authUtils');
const Shop = require('../../model/shop/shop');

const dummyInput = {
  product_name : "Grunge Shirts",
  product_price : 69000,
  product_type : 1,
  vintage_type : 6
}

//새로운 상품 등록
router.post('/newItem',(req,res)=>{
  Shop.newItems(dummyInput)
  .then(({code,json})=> {
    res.status(code).send(json);
  })
  .catch((err)=> {
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
  })
});

//아이템 페이지 불러오기
router.get('/page/:vintage_type/:page_index',(req,res)=>{
  const index = req.params.page_index;
  const type = req.params.vintage_type;
  console.log(index,type);
  Shop.PagingItems(index,type)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
  })
})

//아이템 상세정보 불러오기
router.get('/item/:item_idx',(req,res)=>{
  const item = req.params.item_idx;
  console.log(item);
  Shop.RegistItems(item)
  .then(({code,json})=>{
    res.status(code).send(json);
  })
  .catch((err)=>{
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
  })
})

module.exports = router;