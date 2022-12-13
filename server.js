import express from 'express'
import { addOrder, finalizeOrder, getOrderDetails, MarkOrderComplete } from './Controllers/ordercontroller.js';
import { addVendor, updateVendorRating } from './Controllers/vendorcontroller.js';
import { connection } from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log("welcome to hatchnhack backend")
})


app.post('/createOrder',addOrder)
app.post('/CreateNewVendor',addVendor)
app.post('/viewOrder',getOrderDetails)  //id
app.post('/SubmitFinalOrder',finalizeOrder)
app.post('/submitVendorReview',updateVendorRating) //search by vendor name
app.post('/MarkOrderComplete',MarkOrderComplete)  //post body --> id,delivered

app.listen(8080,(req,res)=>{
    try{
        connection();
    }catch(err){
        console.log(err)
    }
})