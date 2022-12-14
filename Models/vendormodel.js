import mongoose from 'mongoose';

const vendorSchema=mongoose.Schema({
    vendor_name:{
        type:'string',
        required:true
    },
    vendor_speciality:{
        type:'string',
        required:true,
    },
    delivery_rating:{
        type:"number",
    },
    overall_rating:{
        type:"number",
    },
    reviewed_by:{
        type:"number"
    },
    price:{
        type:"number",
        required:true
    },
},{ timestamps: true })

export const vendormodel=mongoose.model('vendors',vendorSchema)