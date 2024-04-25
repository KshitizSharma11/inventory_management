const express=require('express');
const router=express.Router();
const items =require('../model/item');

router.post('/add',async (req,res)=>{
try{
        
}catch(err){
console.log(err);
res.status(500).json({message:"chud gya"});
}
})

module.exports = router;