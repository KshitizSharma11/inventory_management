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
        type: 'date',
        required: true,
        unique: true
    },
    exp:{
        type: 'date',
        required: true,
        unique: true
    },
    quantity:{
        type: 'number',
        required: true,
        unique: true,
        default: 1
    },
    pic:{
        type: 'string'
    }
})

const item =mongoose.Model('item',itemModel);
module.exports=item;