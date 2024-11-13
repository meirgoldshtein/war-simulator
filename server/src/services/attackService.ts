import attack from "../models/attack"
import attackDto from "../types/attackDto"
import { CustomError } from "../types/errors"

export const getAttacksService = async (userLocation: string) => {
    try {
        const attacks = await attack.find({distLocation: userLocation}).lean()
        return { success: true, data: attacks, message: "Attacks fetched successfully", status: 200 }
    } catch (error) {
        throw error
    }
}

export const launchAttackService = async (payload :attackDto) => {
    try {
        const { rocket, launchTime, timeToHit, orgSrc, distLocation } = payload
        const newAttack = new attack({ rocket, launchTime, timeToHit, orgSrc, distLocation })
        await newAttack.save()
        return { success: true, data: newAttack, message: "Attack launched successfully", status: 200 }
    } catch (error) {
        throw error
    }
}

export const updateAttackController = async (payload :attackDto) => {
    try {
        const { id, launchTime, timeToHit, orgSrc, distLocation, status } = payload
        const attackExists = await attack.findOne({ _id : id }).lean()
        if (!attackExists) {
            throw new CustomError("Attack does not exist", 400)
        }
        const updatedAttack = await attack.updateOne({ _id : id  }, { launchTime, timeToHit, orgSrc, distLocation, status })
        return { success: true, data: updatedAttack, message: "Attack updated successfully", status: 200 }
    } catch (error) {
        throw error
    }
}