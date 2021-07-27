const path=require('path');
const express=require('express');
//const dotenv=require('dotenv');
const mongoose = require('mongoose');
const passport=require('passport');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const PORT=3000;
const port = process.env.port || 3000
const MONGODB_URI="mongodb+srv://Prince:12345@cluster0.enirt.mongodb.net/Stories?retryWrites=true&w=majority";
const indexRoutes=require('./routes/index');
const authRoutes=require('./routes/auth');
const storiesRoutes=require('./routes/stories');
const bodyParser=require('body-parser');
const { runInContext } = require('vm');

//dotenv.config({path:'./config/config.env'}); 
//Passport config
require('./config/passport')(passport);

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
/*Set Static folder*/
app.use(express.static(path.join(__dirname,'public')));
/*Set template engine*/
app.set('view engine',"ejs");
/**Express session: should be put above passport middleware */
app.use(session({
    secret: 'my super secret',
    resave: false,
    saveUninitialized:false,//Don't create session until something is stored 
    store: new MongoStore({
        mongooseConnection:mongoose.connection
    })
}));
/*Passport middleware*/
app.use(passport.initialize());
app.use(passport.session());

//handlebars Helpers
// const { formatdate } = require("./helpers/hbs");
// const { mainModule } = require('process');

//handlebars
// app.engine('.hbs', ({helpers: { formatdate,},'main',extname: 'hbs',}))

/**Routes */
app.use("/",indexRoutes);
app.use("/auth",authRoutes);
app.use("/stories",storiesRoutes);
mongoose.connect(MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}).then(res=>{
       // console.log(res);
        app.listen(PORT,console.log("Server running on "+ PORT));
    }).catch(err=>{
        console.log(err);
    });
