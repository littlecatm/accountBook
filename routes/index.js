var express = require('express');
var router = express.Router();
//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../lowdb/db.json')
//获取db对象
const db = low(adapter)
const shortid = require('shortid')

/* GET home page. */
/**帐本列表 */
router.get('/account', function(req, res, next) {
  let accounts = db.get('accounts').value()
  res.render('accountList',{accounts:accounts});
  // res.send("帐本列表");
});
/**添加账本记录页面 */
router.get('/account/create', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('createAccount');
});
//添加记录操作
router.post('/account',(req,res)=>{
  console.log(req.body)
  let id = shortid.generate();
  db.get("accounts").unshift({id:id,...req.body}).write()
  // res.send("添加记录成功!")
  res.render('success',{msg:"添加成功咯~~",url:"/account"});
});
//删除账单
router.get('/account/:id',(req,res)=>{
  //获取id
  let id = req.params.id;
  console.log("删除",id)
  //删除
  db.get("accounts").remove({id:id}).write()
  // res.send("删除成功")
  res.render('success',{msg:"删除成功！",url:"/account"});
})

module.exports = router;
