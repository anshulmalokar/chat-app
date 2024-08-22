import {create} from 'zustand';

interface ChatMsgStoreInterface{
    chatMsgs: {
        text: string;
        sender: string;
        reciever: string
    }[],
    updateChatMsgs: (chatMsg : {
        text: string;
        sender: string;
        reciever: string
    }[]) => void
}

export const useChatMsgsStore = create<ChatMsgStoreInterface>( (set) => ({
   chatMsgs: [],
   updateChatMsgs: (chatMsgArray) => set({chatMsgs:chatMsgArray})
}));
