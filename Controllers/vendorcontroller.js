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

export const updateVendorRating = async(req,res) => {
    try{
        let {vendor_id,overall_rating,delivery_rating}=req.body
        if(vendor_id.length!=24){
            res.send({"status":"error", "message":"Vendor ID should be of 24 characters" })
        }else{
            if(vendor_id && overall_rating && delivery_rating ){

                let vendor=await vendormodel.findOne({"_id":vendor_id})
                 if(!vendor){
                  res.send({
                      "status": "error",
                      "message": "Invalid vendor id"
                    });
           
                 }else{
                    if(vendor.reviewed_by==0){
                        vendor.reviewed_by=vendor.reviewed_by+1;
                        await vendormodel.updateOne({"_id":vendor_id},{$set:{"delivery_rating":delivery_rating,"overall_rating":overall_rating,"reviewed_by":vendor.reviewed_by}})
                    }else{
                        vendor.reviewed_by=vendor.reviewed_by+1;
                    vendor.delivery_rating=parseFloat(((vendor.delivery_rating+delivery_rating)/vendor.reviewed_by).toFixed(1))
                    vendor.overall_rating=parseFloat(((vendor.overall_rating+overall_rating)/vendor.reviewed_by).toFixed(1))
                    await vendormodel.updateOne({"_id":vendor_id},{$set:{"delivery_rating":vendor.delivery_rating,"overall_rating":vendor.overall_rating,"reviewed_by":vendor.reviewed_by}})
                    }
                    
                    res.send({
                      "status": "success",
                      "message": "Vendor Rating updated successfully",
                    });
                 }
            
              }else{
                  res.send({
                      "status": "error",
                      "message": "Fill all required fields",
                  })
              }
        }

    }catch(err){
        console.log(err)
    }
}