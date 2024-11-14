import attack from "../models/attack"
import missile from "../models/missile"
import user from "../models/user"
import attackDto from "../types/attackDto"
import { CustomError } from "../types/errors"

export const getAttacksService = async (userLocation: string) => {
    try {
        if (userLocation === "not-israel") {
            const attacks = await attack.find({}).lean()
            return { success: true, data: attacks, message: "Attacks fetched successfully", status: 200 }
        }
        const attacks = await attack.find({ distLocation: userLocation }).lean()
        return { success: true, data: attacks, message: "Attacks fetched successfully", status: 200 }
    } catch (error) {
        throw error
    }
}

export const launchAttackService = async (payload: attackDto, user_id: string) => {
    try {
        // console.log(payload.rocket)
        const missileExists = await missile.findOne({ name: payload.rocket })
        const timeToHit = missileExists?.speed
        const { rocket, launchTime, orgSrc, distLocation } = payload
        const newAttack = new attack({ rocket, launchTime, orgSrc, distLocation, timeToHit })
        await newAttack.save()
        const userExists = await user.findOne({ _id: user_id }).lean()
        if (userExists) {
            const resourceIndex = userExists.resources.findIndex(r => r.name === rocket);
            if (resourceIndex !== -1) {
                userExists.resources[resourceIndex].amount--;
                await user.updateOne({ _id: user_id }, { $set: { resources: userExists.resources } });
            }
        }
        return { success: true, data: newAttack, message: "Attack launched successfully", status: 200 }
    } catch (error) {
        throw error
    }
}

export const updateAttackController = async (payload: attackDto) => {
    try {
        const { id, status } = payload
        const attackExists = await attack.findOne({ _id: id }).lean()
        if (!attackExists) {
            throw new CustomError("Attack does not exist", 400)
        }
        const updatedAttack = await attack.updateOne({ _id: id }, { status })
        return { success: true, data: updatedAttack, message: "Attack updated successfully", status: 200 }
    } catch (error) {
        throw error
    }
}

export const interceptAttackService = async (payload: any, user_id: string) => {
    try {
        console.log(payload)
        const { DefName, ammo_id } = payload
        const attackExists = await attack.findOne({ _id: ammo_id }).lean()
        if (!attackExists) {
            throw new CustomError("Attack does not exist", 400)
        }
        const updatedAttack = await attack.updateOne({ _id: ammo_id }, { status: "INTERCEPTED" })

        const userExists = await user.findOne({ _id: user_id }).lean()
        if (userExists) {
            const resourceIndex = userExists.resources.findIndex(r => r.name === DefName);
            if (resourceIndex !== -1) {
                userExists.resources[resourceIndex].amount--;
                await user.updateOne({ _id: user_id }, { $set: { resources: userExists.resources } });
            }
        }
        return { success: true, data: updatedAttack, message: "Attack intercepted successfully", status: 200 }
    } catch (error) {
        throw error
    }
}