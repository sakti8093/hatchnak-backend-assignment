import mongoose from 'mongoose';

const orderSchema=mongoose.Schema({
   
    customer_name:{
        type:'String',
        required:true
    },
    product_list:{
        type:'Object',
        required:true,
    },
    delivery_date:{
        type:"String",
        required:true
    },
    vendor_details:{
        type:"Array",
    },
    total_price:{
        type:"Number",
    },
    delivery:{
        type:"Boolean",
    },
    readyToFulfillment:{
        type:"Boolean",
    }
})

export const orderModel=mongoose.model('orders',orderSchema)