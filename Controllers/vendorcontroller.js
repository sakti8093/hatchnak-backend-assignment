import { vendormodel } from "../Models/vendormodel.js"

export const addVendor =async(req,res) => {
    try{
        let vendor =req.body
        vendor.reviewed_by=1
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
        let {vendor_name,overall_rating,delivery_rating}=req.body

        if(vendor_name && overall_rating && delivery_rating ){

          let vendor=await vendormodel.findOne({"vendor_name":vendor_name})

          vendor.reviewed_by=vendor.reviewed_by+1;
          vendor.delivery_rating=(vendor.delivery_rating+delivery_rating)/vendor.reviewed_by
          vendor.overall_rating=(vendor.overall_rating+overall_rating)/vendor.reviewed_by
          await vendormodel.updateOne({"vendor_name":vendor_name},{$set:{"delivery_rating":vendor.delivery_rating,"overall_rating":vendor.overall_rating,"reviewed_by":vendor.reviewed_by}})

          res.send({
            "status": "success",
            "message": "Vendor Rating updated successfully",
          });
        }else{
            res.send({
                "status": "error",
                "message": "Fill all required fields",
            })
        }
    }catch(err){
        console.log(err)
    }
}