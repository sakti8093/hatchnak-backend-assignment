import express from 'express'
import { addVendor, allVendorDetails, updateVendorRating } from '../Controllers/vendorcontroller.js';
const router=express.Router();

router.post('/CreateNewVendor',addVendor)
router.post ('/submitVendorReview',updateVendorRating) 

// for viewing all vendors
router.get('/allVendors',allVendorDetails)

export default router