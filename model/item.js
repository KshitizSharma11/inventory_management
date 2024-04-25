const mongoose=require('mongoose');
const itemModel=new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
        unique: true
    },
    barcode:{
        type: 'string',
        required: true,
        unique: true
    },
    mfd:{
        type: 'string',
        required: true,
        
    },
    exp:{
        type: 'string',
        required: true,
   
    },
    quantity:{
        type: 'number',
        required: true,
        
        default: 1
    },
    pic:{
        type: 'string',
        required: true
    }
})

const item =mongoose.model('item',itemModel);
module.exports=item;