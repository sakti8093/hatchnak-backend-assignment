import { vendormodel } from "../Models/vendormodel.js"

export const addVendor =async(req,res) => {
    try{
        let vendor =req.body
        vendor.reviewed_by=0
        vendor.delivery_rating=5
        vendor.overall_rating=5
       await vendormodel.create(vendor)
        res.send({
            "status":"success",
            "message":"vendor added successfully"
        })
    }catch(err){
        res.send(err.message)
    }
}