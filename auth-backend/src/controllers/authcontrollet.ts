import bcrypt from "bcrypt";
import UserModel from "../models/usermodel";
import { Request, Response } from "express";
import { TokenManager } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, "15");
    const user_exits = await UserModel.findOne({ username });
    if (user_exits) {
      return res.status(201).json({ message: "User already exists" });
    }
    const new_user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    await new_user.save();
    TokenManager.generateTokenAndSetCookie(new_user._id.toString(),res);
    return res.status(200).json({
      message: "User Signed Up Success",
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
