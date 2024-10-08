import bcrypt from "bcrypt";
import UserModel from "../models/usermodel";
import { Request, Response } from "express";
import { TokenManager } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user_exits = await UserModel.findOne({ username });
    if (user_exits) {
      return res.status(201).json({ message: "User already exists" });
    }
    const new_user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    await new_user.save();
    await TokenManager.generateTokenAndSetCookie(new_user._id.toString(),res);
    return res.status(200).json({
      message: "User Signed Up Success",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request,res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if(!user){
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password || '');
    if(!isValidPassword){
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    await TokenManager.generateTokenAndSetCookie(user._id.toString(),res);
    return res.status(200).json({
      _id: user._id,
      username: user.username
    });
  }catch(e){
    console.log(e);
    return res.status(500).json({
      message: "Login failed"
    });
  }
}