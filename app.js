
let express = require('express');
let mongoose = require('mongoose');
let app = express();
const bodyParser = require('body-parser');
const UserSchema = require('./models/userSchema');
let userRouter = require('./routes/userRouter');

app.use(bodyParser.json());

app.use('/user',userRouter );




mongoose.connect("mongodb+srv://Gautama:Gaunik%401234@cluster1.txuuzz9.mongodb.net/gautam?retryWrites=true&w=majority");// Here we connect our system with our database gautam.
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
})




// app.get('/find_user',async(req,res)=>{
//     let user = await User.find();// creating our document .
//     res.send(user);
// })


// app.get('/find_one',async(req,res)=>{
//     let user = await User.find({name:"gautam"});
//     res.send(user.name);
// })
//
app.listen(3030,()=>{
    console.log("Start listening");
})

