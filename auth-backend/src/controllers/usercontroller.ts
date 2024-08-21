import { Request, Response } from "express";
import UserModel from "../models/usermodel";

export const getAllUsers = async(req: Request, res: Response) => {
    try{
        const all_users = await UserModel.find({},'username');
        res.status(200).json(all_users);
    }catch(e){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}