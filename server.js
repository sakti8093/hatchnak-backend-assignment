import express from 'express'
import { addOrder, finalizeOrder, getOrderDetails, MarkOrderComplete } from './Controllers/ordercontroller.js';
import { addVendor, updateVendorRating } from './Controllers/vendorcontroller.js';
import { connection } from './db.js';
import vendorRouter from './Routes/vendor.route.js';
import orderRouter from './Routes/order.route.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log("welcome to hatchnhack backend")
})

app.use ('/orders',orderRouter)
app.use ('/vendors',vendorRouter) 

app.listen(8080,(req,res)=>{
    try{
        connection();
    }catch(err){
        console.log(err)
    }
})