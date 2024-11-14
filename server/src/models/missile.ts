import { Document, model, ObjectId, Schema, Types } from "mongoose";

export interface IMissile extends Document {
    name: string,
    description: string,
    speed: number ,
    intercepts:[],
    price: number
}

const missileSchema = new Schema<IMissile>( {
    name: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"]
    },
    description: { type: String, required: true },
    speed: { type: Number, required: true },
    intercepts: { type: [], required: true },
    price: { type: Number, required: true }

})
missileSchema.index({ name: 1 }, { unique: true });

export default model<IMissile>("Missile", missileSchema);