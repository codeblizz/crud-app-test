const router = require('express').Router();
const Flight = require('../models/flight.model');
const LoggedUser = require("../middleware/LoggedUser");
const mongoose = require("mongoose");

router.get('/', LoggedUser, async(req, res, next) => {
  await Flight.find({createdBy: req.user}) 
  .populate("createdBy", "_id email role")
  .sort ({flightDate: -1})   
  .select("passengerName flightDestination flightType flightAmount")
  .then(fl=>res.json(fl))
  .catch(err => res.status(400).json('Error: ' + err));
}); 

router.get('/all', LoggedUser, async(req, res, next) => {
  await Flight.find() 
  .sort ({flightDate: -1})   
  .select("passengerName flightDestination flightType flightAmount")
  .then(fl=>res.json(fl))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/edit/:id', LoggedUser, async (req, res, next) => {  
  await Flight.findById(req.params.id) 
  .populate("createdBy", "_id email role")
  .sort ({flightDate: -1})  
  .select("passengerName flightDestination flightType flightAmount")   
  .then(fl => res.status(200).json(fl))
  .catch(err => res.status(400).json('Error: ' + err));
}); 

router.post('/create', LoggedUser, async(req, res, next) => {
  const newFlight = new Flight({
    _id: new mongoose.Types.ObjectId(),  
    passengerName: req.body.passengerName,
    flightDestination: req.body.flightDestination,
    flightType: req.body.flightType,
    flightAmount: req.body.flightAmount,  
    createdBy: req.user,      
  })
    await newFlight.save()  
    .then(fl=>res.status(200).json({
      message: "Flight created successfully", fl
    }))
    .catch(err=>res.status(400).json({
      message: "Flight update failed", err
    })); 
})

router.delete('/:id', LoggedUser, async(req, res, next) => {
  await Flight.findById({_id: req.params.id, deletedBy: req.user})
    .populate("deletedBy", "_id email role")
    .then(flight => flight.remove())
    .then((fl) => res.status(200).json({
      message: "Flight deleted", fl
    }))
    .catch(err => res.status(400).json(err));
});

router.put('/update/:id', LoggedUser, async(req, res, next) => {
  await Flight.findById(req.params.id)
    .then(flight => {
      _id = new mongoose.Types.ObjectId(),
      flight.passengerName = req.body.passengerName;
      flight.flightDestination = req.body.flightDestination;
      flight.flightType = req.body.flightType;
      flight.flightAmount = req.body.flightAmount;
      flight.updatedBy = req.user;

      flight.save()
        .then((fl) => res.status(200).json({
           message: "Flight detail updated successfully", fl
        }))
        .catch(err => res.status(400).json({
          message: "Flight update failed", err
        }));
  })
  .catch(err => res.status(400).json({
    message: "Flight update failed", err
  }));
});

router.patch('/update/:id', LoggedUser, async(req, res, next) => {
  await Flight.findById(req.params.id)
    .then(flight => {
      _id = new mongoose.Types.ObjectId(),
      flight.passengerName = req.body.passengerName;
      flight.flightDestination = req.body.flightDestination;
      flight.flightType = req.body.flightType;
      flight.flightAmount = req.body.flightAmount;
      flight.updatedBy = req.user;

      flight.save()
        .then((fl) => res.status(200).json({
           message: "Flight detail updated successfully", fl
        }))
        .catch(err => res.status(400).json({
          message: "Flight update failed", err
        }));
  })
  .catch(err => res.status(400).json({
    message: "Flight update failed", err
  }));
});

module.exports = router; 