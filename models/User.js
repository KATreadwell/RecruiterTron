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

// const bcrypt = require("bcrypt");

// module.exports.encrypt = (toBeHashed) => {
//   console.log('password being hashed: ', toBeHashed)
//   return new Promise(function(resolve, reject) {
//     const saltRounds = 10;
//     let hashed = "";
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//       bcrypt.hash(toBeHashed, salt, function(err, hash) {
//         if (err) {
//           reject(err);
//         } else {
//           hashed = hash;
//           resolve(hashed);
//         }
//       });
//     });
//   })
// }
// const checkPasswordLoginAuthenticate = (enteredPassword, storedPassword, user) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(enteredPassword, storedPassword, (err, match) => {
//       if (err) {
//         reject(err);
//       } else {
//         if (match) {
//           resolve({ match: true });
//         } else {
//           resolve({ match: false });
//         };
//       };
//     });
//   });
// };


 
 const UserSchema = new Schema({
    username: String,
   //  admin: Boolean,
    firstName: String,
    lastName: String,
    password: String,
 })

const User = mongoose.model("User", UserSchema);

module.exports = User;


//function
// const bcrypt = require("bcrypt");

// module.exports.encrypt = (toBeHashed) => {
//   console.log('password being hashed: ', toBeHashed)
//   return new Promise(function(resolve, reject) {
//     const saltRounds = 10;
//     let hashed = "";
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//       bcrypt.hash(toBeHashed, salt, function(err, hash) {
//         if (err) {
//           reject(err);
//         } else {
//           hashed = hash;
//           resolve(hashed);
//         }
//       });
//     });
//   })
// }
