const GoogleStrategy=require('passport-google-oauth20').Strategy;
const User=require('../models/User');
const GOOGLE_CLIENT_ID="684996102870-9m96l2knjlsc3e1cpom0d4kss1k6r4qo.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="ZlTDcQ1egCX-L2YnbxxUOA34";
module.exports=function(passport){
    passport.use(new GoogleStrategy({
        clientID:GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done)=>{
        let newUser={
          googleId:profile.id,
          displayName:profile.displayName,
          firstName:profile.name.givenName,
          lastName:profile.name.familyName,
          image:profile.photos[0].value
        };
        try{
        let user=await User.findOne({googleId:profile.id});
        if(user){
          done(null,user);
        }
        else{
         user= await new User(newUser).save();
         done(null,user);
        }
      }
        catch(err){
          console.error(err);
        }
    }
    )
)
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
