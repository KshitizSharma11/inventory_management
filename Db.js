const mongoose=require('mongoose');
const url='mongodb+srv://KshitizSharma11:16041855@clusterkz.vlm0iyo.mongodb.net/';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Db=mongoose.connection;
Db.on('connected',()=>{
    console.log('connection established');
})

module.exports=Db;