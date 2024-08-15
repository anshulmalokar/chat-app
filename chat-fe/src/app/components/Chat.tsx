"use client"
import React from 'react'
import {useState,useEffect} from 'react';
import io from "socket.io-client";

type Props = {}

export default function Chat({}: Props) {
  const [msg,setMsg] = useState('');
  const [socket,setSocket] = useState(null);

  useEffect((): any => { 
    const web_socket = io("http://localhost:3002");
    // @ts-ignore
    setSocket(web_socket);
    return () => web_socket.close();
  },[])

  const submitMessage = (e: any) => {
    e.preventDefault();
    console.log("Submitting message ....");
    console.log(socket === null ? "socket is null" : "socker is not null");
    if(socket){
      console.log('Sending actual messagre');
      // @ts-ignore
      socket.emit('message',msg);
      console.log('message sent...');
      setMsg('');
    }
  }

  return (
    <>
       <form onSubmit={submitMessage} className="max-w-md mx-auto my-10">  
           <div className="relative">  
               <input type="text"
                       value={msg}
                       onChange={(e) => setMsg(e.target.value)}
                       placeholder="Type your text here"
                       required
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
               <button type="submit"
                       className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                       Send
               </button>
           </div>
       </form>
    </>
  )
}