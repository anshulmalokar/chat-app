"use client"
import React, { use, useEffect } from "react";
import { useUsersStore } from "../zustand/userStore";
import { useReciverStore } from "../zustand/userReciverStore";
import { useAuthStore } from "../zustand/useAuthStore";
import axios from "axios";
import { useChatMsgsStore } from "../zustand/useMsgStore";
type Props = {};

export default function ChatUsers({}: Props) {
  const { usersArray } = useUsersStore();
  const {reciver_name,updateReciverState} = useReciverStore();
  const { authName } = useAuthStore();
  const {updateChatMsgs} = useChatMsgsStore();
  const updateReciever = (username: string) => {
    updateReciverState(username);
  }

  const getAllMsgs = async (authName: string, reciver_name: string) => {
    const response = await axios.get(
      `http://localhost:3002/msgs?sender=${authName}&reciever=${reciver_name}`
    );
    if(response.data.message === "Conversation not found"){
      alert("Please start a conversation");
    }
    const data: {
      text: string;
      sender: string;
      reciever: string;
    }[] = await response.data.all_msgs;
    if(data.length > 0){
      updateChatMsgs(data); 
    }
  };

  useEffect(() => {
    if(reciver_name){
      getAllMsgs(authName, reciver_name);
    }
  }, [reciver_name]);

  return (
    <>
      {usersArray.map((user, index) => (
        <div onClick={() => {
          updateReciever(user.username);
        }} className = {`${reciver_name === user.username ? "bg-green-400" : "bg-slate-500"} rounded-xl m-3 p-5 text-xs`} key={index}>
          <h2>{user.username}</h2>
        </div>
      ))}
    </>
  );
}

