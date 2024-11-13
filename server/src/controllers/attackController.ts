import { Request, Response } from "express"
import { getAttacksService, launchAttackService, updateAttackController } from "../services/attackService"
import attackDto from "../types/attackDto"

export const getAttacks = async (req: Request, res: Response) => {
    try {
        const userLocation = (req as any).user.location

        const attacks = await getAttacksService(userLocation)
        res.status(200).json(attacks)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const launchAttack = async (req: Request<any, any, attackDto>, res: Response) => {
    try {
        const attack = await launchAttackService(req.body)
        res.status(200).json(attack)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const updateAttack = async (req: Request<any, any, attackDto>, res: Response) => {
    try {
        const attack = await updateAttackController(req.body)
        res.status(200).json(attack)
    } catch (error) {
        res.status(500).json(error)
    }
}