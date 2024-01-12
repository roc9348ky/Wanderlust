const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require ("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const { render } = require("ejs");


router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,wrapAsync(listingController.createListing));

//New Route

router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, wrapAsync(listingController.UpdateListing))
.delete("/:id",isLoggedIn,wrapAsync(listingController.DeleteListing));


//edit route

router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEdit));


module.exports = router;