const mongoose=require('mongoose');
const url='mongodb://localhost:27017/inventory';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Db=mongoose.connection;
Db.on('connected',()=>{
    console.log('connection established');
})

module.exports=Db;