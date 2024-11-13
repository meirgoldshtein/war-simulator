import { Request, Response } from "express"
import organization from "../models/organization"


export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await organization.find().lean()
        res.status(200).json(organizations)
    } catch (error) {
        res.status(500).json(error)
    }
}