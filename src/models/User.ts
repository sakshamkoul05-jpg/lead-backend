import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "../constants";
import { UserRole } from "../interfaces";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "sales",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Don't return password in JSON responses
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.password = undefined;
    return ret;
  },
});

const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;
