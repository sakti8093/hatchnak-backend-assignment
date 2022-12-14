import express from 'express'
import { addOrder, finalizeOrder, getOrderDetails, MarkOrderComplete } from './Controllers/ordercontroller.js';
import { addVendor, updateVendorRating } from './Controllers/vendorcontroller.js';
import { connection } from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log("welcome to hatchnhack backend")
})


app.post ('/createOrder',addOrder)
app.post ('/CreateNewVendor',addVendor)
app.post ('/viewOrder',getOrderDetails)  
app.patch ('/SubmitFinalOrder',finalizeOrder)
app.patch ('/MarkOrderComplete',MarkOrderComplete) 
app.post ('/submitVendorReview',updateVendorRating) 


app.listen(8080,(req,res)=>{
    try{
        connection();
    }catch(err){
        console.log(err)
    }
})