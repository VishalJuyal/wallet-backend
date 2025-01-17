import mongoose, { mongo } from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: Number,
    },
  },
  { versionKey: false }
);

const userTable = mongoose.model("userDetails", userInfoSchema);
export default userTable;
