import express from 'express'
import { addOrder, finalizeOrder, getOrderDetails, MarkOrderComplete } from '../Controllers/ordercontroller.js';
import { allVendorDetails } from '../Controllers/vendorcontroller.js';

const router=express.Router();

router.post ('/createOrder',addOrder)
router.get ('/viewOrder/:id',getOrderDetails)  
router.patch ('/SubmitFinalOrder/:id',finalizeOrder)
router.patch ('/MarkOrderComplete/:id',MarkOrderComplete)

// for viewing all vendors
router.get('/allVendors',allVendorDetails)


export default router