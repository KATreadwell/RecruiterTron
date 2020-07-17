const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   username: String,
   admin: Boolean,
   firstName: String,
   lastName: String,
   password: String,
})

UserSchema.pre("save", function(next) {
   const user = this;
   if (user.isModified("password") || user.isNew) {
      bcrypt.hash(user.password, 10, (err, hash) => {
         if (err) {
            return next(err);
         }
         user.password = hash;
         next();
      })
   } else {
      next();
   }
});

UserSchema.methods.validatePassword = function(password) {
   const user = this;
   return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, match) => {
         if (err) {
            reject(err);
         }
         resolve({match});
      })
   })
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
