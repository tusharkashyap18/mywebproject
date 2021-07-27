const express=require('express');
const router=express.Router();
const {ensureGuest,ensureAuth}=require('../middleware/authmid');
const Story=require('../models/story');
//ADD story route
router.get("/add",ensureAuth,(req,res)=>{
    var data=[];
    res.render('addStory',{
        pageTitle:"The ScoopBook",
        data:data
    });
})
//Create new story
router.post("/",ensureAuth,async(req,res)=>{
        const newStory={
            title:req.body.title,
            body:req.body.body,
            status:req.body.status,
            user:req.user.id,
        };
        try{
        const story= await new Story(newStory).save();
        console.log(story);
        res.redirect("/dashboard");
        }
        catch(err){
            console.error(err);
        }
})
//Update story
//await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
//    new: true,
//    runValidators: true,
router.post("/:id",ensureAuth,async(req,res)=>{
    try{
    const story= await Story.findById(req.params.id);
    if(story){
        story.title=req.body.title;
        story.body=req.body.body;
        story.status=req.body.status;
        const updatedStory=await story.save();
        if(updatedStory)
        res.redirect("/dashboard");
        }
    }
    catch(err){
        console.error(err);
    }
})
//Get All my story
router.get("/my-story",ensureAuth,async(req,res)=>{
    const stories=await Story.find({user:req.user.id});
    console.log(stories);
    res.render('mystory',{
        pageTitle:"The ScoopBook",
        name:req.user.firstName,
        stories:stories,
        path:"/my-story"   
    });
})

//Get a single story to update
router.get('/edit/:storyId',ensureAuth,async(req,res)=>{
    var data=[];
    var storyId=req.params.storyId;
    const storyExist=await Story.findOne({_id:storyId});
    data.push(storyExist);
    if(req.user.id == storyExist.user)
            res.render("addStory",{
                pageTitle:"The ScoopBook",
                data:data
            });
    });
//Deletion of the story
router.delete('/:id',ensureAuth,async(req,res)=>{
    console.log(req.params.id);
    const result=await Story.deleteOne({_id:req.params.id});
    console.log(result);
    res.setHeader('Content-Type','application/json');
    res.send({
        status:201,
        message:"Successfully deleted"
    })
});
//  To View Story
router.get('/view/:storyId',ensureAuth,async(req,res)=>{
    var data=[];
    var storyId=req.params.storyId;
    const storyExist=await Story.findOne({_id:storyId}).populate('user').exec();
    data.push(storyExist);
                res.render("view",{
                pageTitle:"The ScoopBook",
                data:data
            });
    });
module.exports=router;


//if(req.user.id == storyExist.user)