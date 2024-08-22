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
    console.log('Trying to extract sender and receiver from request query');
    const { sender, reciever } = req.query;
    console.log(`Sender: ${sender}, Receiver: ${reciever}`);
    const all_participants = [sender, reciever];
    console.log(`All participants: ${all_participants}`);
    console.log('Searching for conversation in database');
    const conversation = await conversation_model.findOne({
      users: {
        $all: all_participants,
      },
    });
    console.log(`Conversation found: ${conversation}`);
    if (!conversation) {
      console.log('Conversation not found, sending 404 response');
      res.status(404).send({ message: "Conversation not found" });
    } else {
      console.log('Conversation found, extracting messages');
      const all_msgs = conversation?.messages;
      console.log(`Messages: ${all_msgs}`);
      console.log('Sending 200 response with messages');
      return res.status(200).json({
        all_msgs,
      });
    }
  } catch (e) {
    console.error('Error occurred:', e);
    console.log('Sending 500 response with error message');
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
