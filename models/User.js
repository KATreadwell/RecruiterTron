const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const UserSchema.pre("save", function (next) {
//     let user = this;
//     if (this.isModified("password") || this.isNew) {
//         bcrypt.genSalt(10, funciton (err, salt) {
//             if (err)
//             return next (err);
//         }
//         bcrypt.hash(user.password, salt, null, function (err, hash) {
//             if (err) {
//                 return next (err);
//             }
//             user.password = hash;
//             next();
//         });
//     });
// } else {
//     return next();
// });

 
 const User = new Schema({
    username: String,
    admin: boolean,
    firstName: String,
    lastName: String,
    // userPhoto: ?
 })

const User = mongoose.model("User", UserSchema);

module.exports = User;
