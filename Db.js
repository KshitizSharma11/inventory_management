const mongoose=require('mongoose');
require('dotenv').config();
const url=process.env.MONGO_URL;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Db=mongoose.connection;
Db.on('connected',()=>{
    console.log('connection established');
})

module.exports=Db;