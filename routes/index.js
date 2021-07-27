const express=require('express');
const router=express.Router();
const Story=require('../models/story');
const {ensureGuest,ensureAuth}=require('../middleware/authmid');
//Login Page
router.get("/",ensureGuest,(req,res)=>{
    res.render('login',{
        pageTitle:"Login"
    });
});
//Dashboard
router.get("/dashboard",ensureAuth,async(req,res)=>{
    const stories=await Story.find({status:"public"}).populate('user').exec();
    // const stories=await Story.find({status:"public"});
    console.log(stories);
    res.render('main',{
        pageTitle:"The ScoopBook",
        name:req.user.firstName,
        image:req.user.image,
        stories:stories,
        path:"/dashboard"   
    });
})
module.exports=router;

//user:req.user.id