import missile from "../models/missile";
import user from "../models/user";
import { CustomError } from "../types/errors";
import newUserDto from "../types/newUserDto";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import organization from "../models/organization";

export const registerUser = async (userGet: newUserDto) => {
    try {
        const { username, password ,  orgId  } = userGet
        if (!username || !password|| !orgId) {
            throw new CustomError(
                "All fields are required",
                400
            )
        }
        //check if user exists
        const userExists = await user.findOne({ username }).lean()
        if (userExists) {
            throw new CustomError(
                "User already exists",
                400
            )
        }

        //find the initial resources
        const org = await organization.findOne({_id: orgId}).lean()
        const organizationName = org?.name
        const location = org?.name.split("-")[1] ? org?.name.split("-")[1] : "not-israel"
        const initialResources = org?.resources
        const budget = org?.budget
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new user({
             username,
              password: hashedPassword,
            organization: organizationName,
              resources: initialResources,
               budget,
            orgId,
            location: location, })
        await newUser.save()
        const data = await user.findOne({ username }).lean()
        return { success: true, data: { ...data, password: '********' }, message: "User created successfully", status: 201 }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const loginUserService = async (userGet: newUserDto) => {
    try {
        const { username, password } = userGet
        if (!username || !password) {
            throw new CustomError(
                "Username and password are required",
                400
            )
        }
        //check if user exists
        const userExists = await user.findOne({ username }).lean()
        if (!userExists) {
            throw new CustomError(
                "User does not exist",
                400
            )
        }
        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
        if (!isPasswordCorrect) {
            throw new CustomError(
                "Password is incorrect",
                400
            )
        }
        //gen token
        const token =  jwt.sign({
            user_id: userExists._id,
            orgId: userExists.orgId,
            location: userExists.location,
            username: userExists.username
        }, process.env.JWT_SECRET as string, { expiresIn: "50m" });
        return { success: true, data: { ...userExists, password: '********' }, message: "User logged in successfully", status: 200, token }
    } catch (error) {
        throw error
    }
}

export const verifyUserService = async (token:{user_id: string}) => {
    try {
        const userExists = await user.findOne({ _id: token.user_id }).lean()
        if (!userExists) {
            throw new CustomError(
                "User does not exist",
                400
            )
        }
        const newToken =  jwt.sign({
            user_id: userExists._id,
            organization: userExists.organization,
            username: userExists.username
        }, process.env.JWT_SECRET as string, { expiresIn: "50m" });
        return { success: true, data: { ...userExists, password: '********' }, message: "User logged in successfully", status: 200, token : newToken }
    } catch (error) {
        throw error
    }
}
