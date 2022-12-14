import express from 'express'
import { addVendor, updateVendorRating } from '../Controllers/vendorcontroller.js';
// import { addOrder, finalizeOrder, getOrderDetails, MarkOrderComplete } from './Controllers/ordercontroller.js';
// import { addVendor, updateVendorRating } from './Controllers/vendorcontroller.js';
const router=express.Router();

router.post('/CreateNewVendor',addVendor)
router.post ('/submitVendorReview',updateVendorRating) 

export default router