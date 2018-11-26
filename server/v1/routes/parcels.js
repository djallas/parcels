// require express
import express from 'express';

// register router
const router = express.Router();

// import parcels controller
import ParcelsController from './../../controllers/parcels';

// get all parcels orders
router.get('/', ParcelsController.findAll);
// cancel order
router.put('/:id/cancel', ParcelsController.cancelOne);
// get order details
router.get('/:id', ParcelsController.findOne);
// create new parcel order
router.post('/', ParcelsController.create);
// Set package destination
router.put('/:id/destination', ParcelsController.destination);
// // Change package status
router.put('/:id/status', ParcelsController.changeStatus);
// // Change present location
// router.put('/:id/status', ParcelsController.presentLocation);

// export router
module.exports = router;