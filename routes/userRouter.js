let express = require('express');

let router = express();

let mongoose = require("mongoose");

let userSchema = require('../models/userSchema');

let session = require('express-session');

let cookieParser = require('cookie-parser'); 


router.get('/path',(req,res)=>{
    res.send("working perfectly");
}) 

const User = mongoose.model('user',userSchema);// This is my collection.

router.post('/signup',async(req,res)=>{
    let existingUser = await User.findOne({username:req.body.username});
    if(existingUser!=null){
        res.send("user already exist!");
    }
    const user = new User(req.body); // creating documents.
    await user.save();
    res.send(user);
})


// finding users
// here to fetch the user name we can use both query and path to get the details of the user.
// every query function have a callback attach to it.


// router.get('/',async(req,res)=>{
//     let user = await User.find({username: req.query.username});
//     if(user){
//         res.send(user);
//     }else{
//         res.send("No user found !");
//     }
// })

// creating sessions 


const oneDay = 1000* 60 *60*24;

router.use(session({
    secret:"This is my own secret",
    saveUninitialized:true,
    cookie:{maxAge:oneDay},
    resave:false
}));

router.post("/login",async(req,res)=>{
    let user = await User.findOne({username:req.body.username});
    if(user!=null &&user.password===req.body.password){
        req.session.username = user.username;
        console.log(req.session);
        res.send("User is authenticated");
    }else{
        res.send("No user found !");
    }
});

// here find is a query function.

let checkAuth =  (req,res,next)=>{
    let user =  User.findOne({username:req.body.username},(err,result)=>{
        if(err||!result){
            res.send("Authentication failed !");
        }else{
            if(result.password === req.body.oldPassword){
                next();
            }else{
                res.send("Authentication failed !");
            }
        }
    })
}

let checkAuth2 = (req,res,next)=>{
    if(req.session!=null&& req.session.username!=null){
        next();
    }else{
        res.send("Not Authenticated");
    }
}

router.get('/:username',(req,res)=>{
    let user =  User.find({username: req.params.username},(error,result)=>{
        if(error){
            res.send("user not found !");
        }
        else{
            res.send(result);
        }
    });
});

// forgot password.

router.put('/password',checkAuth2,async(req,res)=>{
        try {
            const result =  await User.findOneAndUpdate({$and:[{username:req.body.username},
                {password:req.body.oldPassword}]},
                {password:req.body.newPassword})
                res.send(result);
        } catch (error) {
            res.send(error);
        }
});





module.exports = router;