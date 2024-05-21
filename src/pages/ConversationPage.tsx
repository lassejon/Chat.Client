import { useState, useEffect, createContext, useMemo, useContext } from 'react'
import ConversationsBar from '../components/ConversationsBar';
import Chat from '../components/Chat';
import Conversation from '../dtos/responses/Conversation';
import CreateNewConversationButton from '../components/CreateNewConversationButton';
import { SignalRContext } from "../services/signal-r/SignalRContext";
import Message from '../dtos/requests/Message';
import ConversationRequest from '../dtos/requests/ConversationRequest';

export const ConversationContext = createContext<{
    currentConversation: Conversation,
    setCurrentConversation: React.Dispatch<React.SetStateAction<Conversation>>,
    conversations: Conversation[],
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
    createConversation: boolean,
    setCreateConversation: React.Dispatch<React.SetStateAction<boolean>>,
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    createConversationRequest: ConversationRequest,
    setCreateConversationRequest: React.Dispatch<React.SetStateAction<ConversationRequest>>
} | undefined>(undefined);

const ConversationPage = () => {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [currentConversation, setCurrentConversation] = useState(conversations[0])
    const [createConversation, setCreateConversation] = useState(false)
    const [createConversationRequest, setCreateConversationRequest] = useState(new ConversationRequest());
    const signalRConnection = useContext(SignalRContext);

    const [messages, setMessages] = useState<Message[]>([])
    const conversationsMemo = useMemo(() => ({ conversations, setConversations, currentConversation, setCurrentConversation, createConversation, setCreateConversation, messages, setMessages, createConversationRequest, setCreateConversationRequest }), [conversations, currentConversation, createConversation, messages, createConversationRequest])



    useEffect(() => {
        fetch(`/api/conversations/${currentConversation?.id ?? ''}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('_auth_type')} ${localStorage.getItem('_auth')}`
            }
        })
            .then(response => response.json())
            .then(data => setMessages(data.messages ?? []))
            .catch(err => {
                console.log(err)
                setMessages([]);
            });
    }, [currentConversation]);

    useEffect(() => {
        fetch('/api/conversations', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('_auth_type')} ${localStorage.getItem('_auth')} `
            }
        })
            .then(response => response.json())
            .then(data => {
                setConversations(data);
                setCurrentConversation(data[0] || null); // Set currentConversation after fetching data
            })
            .catch(err => console.log("error: " + err));
    }, []);

    useEffect(() => {
        if (!signalRConnection) return;

        const { connection } = signalRConnection;

        connection?.on("ReceiveMessage", (message: Message) => {
            setConversations((prevConversations) => {
                const conversationIndex = prevConversations.findIndex((conversation) => conversation.id === message.conversationId);
                if (conversationIndex === -1) return prevConversations;

                const updatedConversations = [...prevConversations];
                const updatedConversation = { ...updatedConversations[conversationIndex] };

                updatedConversation.latestMessage = message.content;
                updatedConversation.latestMessageAt = message.sentAt;

                if (currentConversation?.id !== message.conversationId) {
                    updatedConversation.unreadMessages = (updatedConversation.unreadMessages ?? 0) + 1;
                }

                updatedConversations[conversationIndex] = updatedConversation;

                return updatedConversations;
            });

            if (currentConversation?.id === message.conversationId)
                setMessages((prevMessages) => [...prevMessages, message]);
        });

        connection?.on("DeletedConversation", (conversationId: string) => {
            setConversations((prevConversations) => {
                let updatedConversations = [...prevConversations];

                console.log("before deleted conversation id: " + conversationId);
                updatedConversations.forEach((conversation) => {
                    console.log(conversation.id);
                });
                updatedConversations = updatedConversations.filter((conversation) => conversation.id !== conversationId);

                console.log("after deleted conversation id: " + conversationId);

                updatedConversations.forEach((conversation) => {
                    console.log(conversation.id);
                });

                return updatedConversations;
            });

            if (currentConversation?.id === conversationId) {
                setMessages([]);
                setCurrentConversation(new Conversation());
            }
        });

        return () => {
            connection?.off("ReceiveMessage");
        };
    }, [signalRConnection, currentConversation]);

    const deleteConversation = async () => {
        const deleted = await signalRConnection?.connection?.invoke("DeleteConversation", currentConversation?.id);

        console.log("deleted?" + deleted);

        if (!deleted) return;

        setConversations((prevConversations) => {
            let updatedConversations = [...prevConversations];

            console.log("before deleted conversation id: " + currentConversation?.id);
            updatedConversations.forEach((conversation) => {
                console.log(conversation.id);
            });
            updatedConversations = updatedConversations.filter((conversation) => conversation.id !== currentConversation?.id);

            console.log("after deleted conversation id: " + currentConversation?.id);

            updatedConversations.forEach((conversation) => {
                console.log(conversation.id);
            });

            return updatedConversations;
        });

        setMessages([]);
        setCurrentConversation(new Conversation());
    }

    return (
        <ConversationContext.Provider value={conversationsMemo}>
            <div className="flex bg-white dark:bg-gray-900">
                <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
                    <div className="h-full overflow-y-auto">
                        <div className="flex flex justify-between p-2">
                            <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Conversations</div>
                            <CreateNewConversationButton />
                        </div>
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
                    <Chat deleteConversation={deleteConversation} />
                </div>
            </div>
        </ConversationContext.Provider>
    )
}

export default ConversationPage