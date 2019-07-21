import mongoose from "mongoose";
import IUserModel from "Types/IUserModel";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profile: {
    birthdate: Date,
    comments: [{
      ref: "Comment",
      type: mongoose.Schema.Types.ObjectId
    }],
    email: {
      lowercase: true,
      required: true,
      type: String,
      unique: true
    },
    name: {
      required: true,
      type: String
    },
    picture: String,
    posts: [{
      ref: "Post",
      type: mongoose.Schema.Types.ObjectId
    }],
    role: String,
    sex: String
  },
  provider: String,
  providerId: String
}, { collection: "users", timestamps: true });

// // Methods.
// userSchema.methods.getHashOptions = (): IHashOptions => ({
//   algorithm: "sha1",
//   encoding: "base64"
// });

// userSchema.methods.isSamePassword = function(candidatePassword: string):
// boolean {
//   const candidateHashedPassword = hash(
//     candidatePassword, this.getHashOptions()
//   );

//   return (this.password === candidateHashedPassword) ?
//     true : false;
// };

// // Middleware for hashing the user's password.
// userSchema.pre("save", function save(next) {
//   const user = <IUserModel>this;

//   if (!user.isModified("password"))
//     return next();

//   user.password = hash(user.password, user.getHashOptions());
// });

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;