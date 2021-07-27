const express=require('express');
const passport=require('passport');
const Story=require('../models/story');
const router=express.Router();
//Login route /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// Google auth callback route /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
async function(req, res) {
  //Fetch story of the user from database
  const stories=await Story.find({status:"public"}).populate('user').exec();
  // Successful authentication, redirect to the page.
  res.render('main',{
    pageTitle:"Dashboard",
    name:req.user.firstName,
    image:req.user.image,
    stories:stories,    
    path:"/dashboard"  
});
});
//logout route
router.get('/logout',(req,res)=>{
    req.session.destroy();//destroy session
    req.logOut();//method of passport to logout
    res.redirect("/");
})

module.exports = router;