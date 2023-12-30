
const Listing = require("../models/listing");

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings});
};


module.exports.renderNewForm = (req,res) => {
    res.render("new.ejs");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing) {
        req.flash("error","Listing you requested for does not exit");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("show.ejs", {listing});

};

module.exports. createListing = async (req,res,next) => {
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(400,result.error);
    // }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");

};


module.exports.renderEdit = async(req,res) => {
    let {id} = req.params;
    
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exit");
        res.redirect("/listings");
    }
    res.render("edit.ejs", {listing});
};

module.exports.UpdateListing = async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.DeleteListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "New Listing Deleted");
    res.redirect("/listings");

};
