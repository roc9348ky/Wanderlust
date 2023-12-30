const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require ("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");


//Index Route
router.get("/", wrapAsync(async (req,res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings});
}));

//New Route

router.get("/new",isLoggedIn, (req,res) => {
    res.render("new.ejs");
});


//show route

router.get("/:id",(wrapAsync,async (req,res) => {
    let {id} = req.params;
    
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error","Listing you requested for does not exit");
        res.redirect("/listings");
    }
    res.render("show.ejs", {listing});

}));

//create Route

router.post("/",isLoggedIn,wrapAsync(async (req,res,next) => {
        let result = listingSchema.validate(req.body);
        console.log(result);
        if(result.error){
            throw new ExpressError(400,result.error);
        }
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New Listing Created");
        res.redirect("/listings");
   
})
);

//edit route

router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res) => {
    let {id} = req.params;
    
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exit");
        res.redirect("/listings");
    }
    res.render("edit.ejs", {listing});
}));

//update route
router.put("/:id",isLoggedIn, wrapAsync(async(req,res) => {
      let {id} = req.params;
      await Listing.findByIdAndUpdate(id, {...req.body.listing});
      req.flash("success", "Listing Updated");
      res.redirect(`/listings/${id}`);
}));

//DELETE ROUTE
router.delete("/:id",isLoggedIn,wrapAsync(async (req,res) => {
     let {id} = req.params;
     let deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     req.flash("success", "New Listing Deleted");
     res.redirect("/listings");

}));


module.exports = router;