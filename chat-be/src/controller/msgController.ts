import { conversation_model } from "../models/conversationModel";
import { Request, Response } from "express";
export const addMessageToConversation = async (
  all_participants: string[],
  msg: {
    text: string;
    sender: string;
    reciever: string;
  }
) => {
  try {
    let conversation = await conversation_model.findOne({
      users: {
        $all: all_participants,
      },
    });
    if (!conversation) {
      conversation = await conversation_model.create({
        users: all_participants,
      });
    }
    conversation.messages.push(msg);
    await conversation.save();
  } catch (e) {
    console.log(e);
  }
};

export const getMsgForConversation = async (req: Request, res: Response) => {
  console.log('Entering getMsgForConversation function');
  try {
    const { sender, reciever } = req.query;
    const all_participants = [sender, reciever];
    const conversation = await conversation_model.findOne({
      users: {
        $all: all_participants,
      },
    });
    if (!conversation) {
      res.status(404).send({ message: "Conversation not found" });
    } else {
      const all_msgs = conversation?.messages;
      return res.status(200).json({
        all_msgs,
      });
    }
  } catch (e) {
    return res.status(500).json({
    });
  }
};
