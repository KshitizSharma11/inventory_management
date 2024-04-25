const express=require('express');
const router=express.router();
const items =require('../model/items');

router.post('/add',async (req,res)=>{
try{
        
}catch(err){
console.log(err);
res.status(500).json({message:"chud gya"});
}
})

module.exports = router;