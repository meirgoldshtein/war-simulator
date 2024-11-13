import { Document, model, ObjectId, Schema, Types } from "mongoose";

enum Status {
    LAUNCHED = "LAUNCHED",
    HIT = "HIT",
    INTERCEPTED = "INTERCEPTED"
}

export interface IAttack extends Document {
    rocket: string,
    launchTime: Date,
    timeToHit: number,
    status: Status,
    orgSrc: string,
    distLocation: string,
}

const attackSchema = new Schema<IAttack>({
    rocket: {
        type: String,
    },
    launchTime: { type: Date, required: true },
    timeToHit: { type: Number, required: true },
    status: {
        type: String,
        default: Status.LAUNCHED
    },
    orgSrc: { type: String, required: true },
    distLocation: { type: String, required: true },
})

export default model<IAttack>("Attack", attackSchema);
export { Status }