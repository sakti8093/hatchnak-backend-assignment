import mongoose from 'mongoose';

const vendorSchema=mongoose.Schema({
    vendor_name:{
        type:'String',
        required:true
    },
    vendor_speciality:{
        type:'String',
        required:true,
    },
    delivery_time:{
        "type":"Number"
    },
    delivery_rating:{
        type:"Number"
    },
    overall_rating:{
        type:"Number"
    },
    reviewed_by:{
        type:"Number"
    },
    price:{
        type:"Number",
        required:true
    }
})

export const vendormodel=mongoose.model('vendors',vendorSchema)