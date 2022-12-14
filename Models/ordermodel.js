import mongoose from 'mongoose';

const orderSchema=mongoose.Schema({
   
    customer_name:{
        type:'string',
        required:true
    },
    product_list:{
        type:'object',
        required:true,
    },
    delivery_date:{
        type:"string",
        required:true
    },
    vendor_details:{
        type:"array",
    },
    total_price:{
        type:"number",
    },
    delivery:{
        type:"boolean",
    },
    ready_for_fulfillment:{
        type:"boolean",
    }
},{ timestamps: true })

export const orderModel=mongoose.model('orders',orderSchema)