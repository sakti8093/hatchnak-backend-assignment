import { orderModel } from "../Models/ordermodel.js"
import { vendormodel } from "../Models/vendormodel.js"

const getVendor=async(key,list)=>{
    let vendors=await vendormodel.find({"vendor_speciality":key}).sort({"delivery_rating":1})
       
    let vendor_assign={
        "product_name":key,
        "assigned_vendor":vendors[0].vendor_name,
        "price":vendors[0].price*list[key]
    }

    if(vendors.length>1){

        if(vendors[0].overall_rating==vendors[1].overall_rating && vendors[0].delivery_rating==vendors[1].delivery_rating){

            let arrayWithSameRatings=[];

            for(let i=0; i<vendors.length;i++){
                if(vendors[i].overall_rating==vendors[0].overall_rating && vendors[i].delivery_rating==vendors[0].delivery_rating){
                    arrayWithSameRatings.push(i);
                }
           }

          let selected=vendors[Math.floor (Math.random()*arrayWithSameRatings.length)]

          vendor_assign.assigned_vendor=selected.vendor_name,
          vendor_assign.price=selected.price*list[key]

         return vendor_assign

        }else{
            return vendor_assign
        }
    }else{
        return vendor_assign
    }
}

export const addOrder=async(req,res)=>{
    try{
        const order=req.body
        let list=order.product_list

        let productDetails=[]

        for(let key in list){
           let vendor=await  getVendor(key,list)
            productDetails.push(vendor)
        }


        let totalPrice=productDetails.reduce((acc,elem)=>{
        return acc+elem.price
        },0)

        order.vendor_details=productDetails
        order.total_price=totalPrice

       let createOrder= await orderModel.create(order)
       res.send({
        "status": "success",
         "message": "Vendor Assigned",
         "id":createOrder._id
        })

    }catch(err){
        res.status(500).send(err)
    }
}

export const getOrderDetails = async function(req,res){
    const {id}=req.body
   try{
    if(id){
        let orderDetails=await orderModel.findOne({"_id":id})
        res.send({
            "status": "success",
            "message": orderDetails
        })
    }else{
        res.status(404).send({
            "status": "error",
            "message": "Enter Valid Id"
        })
    }
   }catch(err){
    res.status(500).send({
        "status": "error",
        "message":"Internal Server Error"
    })
   }
}