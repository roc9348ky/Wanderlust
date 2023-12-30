const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    comment:String,
    rating: {
        type:Number,
        min:1,  //at least one star
        max:5   //not more than five stars
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }

});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;