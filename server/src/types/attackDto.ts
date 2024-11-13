import { Status } from "../models/attack";

export default interface attackDto {
    id?: string;
    rocket: string;
    launchTime: Date;
    timeToHit: number;
    orgSrc: string;
    distLocation: string;
    status:Status
}