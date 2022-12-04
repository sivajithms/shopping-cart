var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})

  })

  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})

router.post('/add-product',(req,res)=>{  


  productHelper.addProduct(req.body,(_id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+_id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product") 
      }
      else{
        console.log(err);
      }
    })
    

   
    res.render("admin/add-product")
  })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})


module.exports = router;

 