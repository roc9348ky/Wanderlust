const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require ("../models/review.js");
const Listing = require ("../models/listing.js");
const reviewController = require("../controllers/review.js");



//Reviews
//Post Route
router.post("/", wrapAsync(reviewController.createReview));


//Delete Route(review)

router.delete("/:reviewId", wrapAsync(reviewController.deleteReview));


module.exports = router;
