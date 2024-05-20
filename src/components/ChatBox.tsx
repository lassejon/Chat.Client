import { useState, useEffect, createContext, useMemo } from 'react'
import ConversationsBar from './ConversationsBar';
import Chat from './Chat';
import Conversation from '../dtos/responses/Conversation';

export const ConversationContext = createContext<{
    currentConversation: Conversation,
    setCurrentConversation: React.Dispatch<React.SetStateAction<Conversation>>,
    conversations: Conversation[];
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
} | undefined>(undefined);

const ChatBox = () => {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [currentConversation, setCurrentConversation] = useState(conversations[0])

    const conversationsMemo = useMemo(() => ({ conversations, setConversations, currentConversation, setCurrentConversation }), [conversations, currentConversation])

    useEffect(() => {
        fetch('/api/chats')
            .then(response => response.json())
            .then(data => {
                setConversations(data)
                setCurrentConversation(data[0]);
                console.log("data")
            })
            .catch(err => console.log("error: " + err));
    }, []);

    return (
        <ConversationContext.Provider value={conversationsMemo}>
            <div className="flex bg-white dark:bg-gray-900">
                <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
                    <div className="h-full overflow-y-auto">
                        <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Conversations</div>
                        <div className="search-chat flex p-3">
                            <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages" />
                            <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">Recent</div>
                        <ConversationsBar />
                    </div>
                </div>
                <div className="flex-grow  h-screen p-2 rounded-md">
                    <Chat />
                </div>
            </div>
        </ConversationContext.Provider>
    )
}

export default ChatBox