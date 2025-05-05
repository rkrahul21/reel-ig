import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface Iuser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<Iuser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true, }
);


//a hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.models?.User || mongoose.model<Iuser>("User", userSchema);

export default User;