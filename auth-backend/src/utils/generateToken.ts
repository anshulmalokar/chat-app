import jsonwebtoken from "jsonwebtoken";
import { Response } from 'express';

export class TokenManager{
  public static async generateTokenAndSetCookie(userId: string,res: Response){
    const token = await jsonwebtoken.sign(
      { userId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, //miliseconds
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
  }

  public static async validateToken(token: string):Promise<boolean>{
    try{
      const validate = await jsonwebtoken.verify(token,process.env.JWT_SECRET as string);
      if(validate){
        return true;
      }
    }catch(e){
      return false
    }
    return false;
  }
}