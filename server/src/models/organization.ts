import { Document, model, ObjectId, Schema, Types } from "mongoose";

export interface IRresource {
    name: string,
    amount: number
    
}
export interface IOrganization extends Document {
    name: string,
    resources: IRresource[],
    budget: number,
}

const organizationSchema = new Schema<IOrganization>({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        minLength: [3, "name must be at least 3 characters long"],
        maxLength: [20, "name must be at most 20 characters long"]
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
organizationSchema.index({ name: 1 }, { unique: true });
export default model<IOrganization>("Organization", organizationSchema);