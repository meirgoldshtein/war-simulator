import { Document, model, ObjectId, Schema, Types } from "mongoose";

export interface IRresource {
    name: string,
    amount: number
    
}
export interface IUser extends Document {
    username: string,
    password: string,
    organization: string,
    resources: IRresource[],
    budget: number,
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"]
    },
    password: { type: String, required: true },
    organization: {
        type: String,
        required: [true, "Password is required"]
    },
    resources: {
        type: [{
            name: String,
            amount: Number
        }],
        default: []
    },
    budget: {
        type: Number,
        default: 0
    }
})

export default model<IUser>("User", userSchema);