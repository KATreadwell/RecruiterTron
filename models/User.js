const promisify = require("util").promisify;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bcryptHash = promisify(bcrypt.hash);
const bcryptCompare = promisify(bcrypt.compare);

const UserSchema = new mongoose.Schema({
   username: String,
   admin: Boolean,
   firstName: String,
   lastName: String,
   password: String,
})

const bcryptHook = (update) => {
   return async function() {
      const target = update ? this._update : this;
      if ((!update && target.isModified("password")) || (update && target.password)) {
         try {
            target.password = await bcryptHash(target.password, 10);
         } catch (e) {
            return e;
         }
      }
   }
}

UserSchema.pre('save', bcryptHook(false));
[
   "findOneAndUpdate",
   "findByIdAndUpdate",
   "updateMany",
   "updateOne",
   "update",
 ].forEach(func => UserSchema.pre(func, bcryptHook(true)));

UserSchema.methods.validatePassword = function(password) {
   return bcryptCompare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
