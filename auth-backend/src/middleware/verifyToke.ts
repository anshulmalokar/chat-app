import { TokenManager } from "../utils/generateToken"
import { Request,Response,NextFunction } from "express";
export const verifyToken = async (req: Request,res: Response,next: NextFunction) => {
   try{
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({msg: "No token, authorization"});
    const valid_token = await TokenManager.validateToken(token);
    if(!valid_token){
        return res.status(401).json({
            message:"Invalid token"
        })    
    }
    next();
   }catch(e){
    return res.status(404).json({
        message:"Internal Server Error"
    })
   }
}