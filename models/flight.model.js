const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const FlightSchema = new Schema(
[ 
  {
    flightDate: {
      type: Date,
      default: Date.now
},
    passengerName: {
        type: String,
        required: true
  }, 
    flightDestination: {
        type: String,
        required: true
 },  
    flightType: {
        type: String,
        required: true
 },
    flightAmount: {
        type: Number,
        required: true 
 },
    createdBy :{
      type: ObjectId,
      ref: "User"
    },
    updatedBy :{
      type: ObjectId,
      ref: "User"
    },
    deletedBy :{
      type: ObjectId,
      ref: "User"
    }
}], {
  timestamps: true,
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;