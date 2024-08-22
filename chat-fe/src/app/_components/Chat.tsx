"use client";
import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuthStore } from "../zustand/useAuthStore";
import { useUsersStore } from "../zustand/userStore";
import { useReciverStore } from "../zustand/userReciverStore";
import axios from "axios";
import ChatUsers from "./ChatUsers";
import { useChatMsgsStore } from "../zustand/useMsgStore";
type Props = {};

export default function Chat({}: Props) {
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const { authName } = useAuthStore();
  const { updateUsers } = useUsersStore();
  const { reciver_name } = useReciverStore();
  const {chatMsgs,updateChatMsgs} = useChatMsgsStore();

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3005/users", {
      withCredentials: true,
    });
    const data: {
      _id: string;
      username: string;
    }[] = await response.data;
    updateUsers(data);
  };

  useEffect((): any => {
    const socketInstance = io("http://localhost:3002", {
      query: {
        username: authName,
      },
    });
    // @ts-ignore
    setSocket(socketInstance);
    getUsers();
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // @ts-ignore
      socket.on("chat_msg", (data: {
        text: string;
        sender: string;
        reciever: string;
    }) => {
        updateChatMsgs([...chatMsgs,data]);
      });
    }
  }, [socket]);

  const submitMessage = (e: any) => {
    e.preventDefault();
    console.log(authName);
    if (socket) {
      const message_to_be_emitted = {
        sender: authName,
        reciever: reciver_name,
        text: msg,
      }
      // @ts-ignore
      socket.emit("message",message_to_be_emitted);
      updateChatMsgs([...chatMsgs,message_to_be_emitted]);
      setMsg("");
    }
  };

  return (
    <>
      <div className="flex h-screen divide-x-4">
        <div className="w-1/5 overflow-scroll">
          <ChatUsers />
        </div>
        <div className="h-screen flex flex-col w-4/5">
          <div>
            {authName} is chatting with {reciver_name}
          </div>
          <div className="msgs-container h-4/5 overflow-scroll">
            {chatMsgs.map((msg, index) => (
              <div
                key={index}
                className={` m-3 ${
                  authName === msg.sender ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`${
                    authName === msg.sender ? "bg-blue-200" : "bg-green-200"
                  } p-3 rounded-lg`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="h1/5 flex items-center justify-center">
            <form onSubmit={submitMessage} className="w-[70%] mx-auto my-10">
              <div className="relative">
                <input
                  type="text"
                  value={msg}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMsg(e.target.value)
                  }
                  placeholder="Type your text here"
                  required
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
