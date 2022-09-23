let mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type:String,required :true},
    username: {type:String, required: true},
    email: {type:String, required: true},
    password: {type: String, required: true},
    age: { type: Number, default: 0 }
});
const User = mongoose.model('userOfGautam',UserSchema); // creating our collection.
module.exports = User;
module.exports = UserSchema;