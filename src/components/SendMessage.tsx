import { useState, useContext, FormEvent } from "react";
import { IoMdSend } from "react-icons/io";
import { ConversationContext } from "./ConversationPage";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AuthenticatedUser from "../dtos/responses/AuthenticatedUser";
import Message from "../dtos/requests/Message";
import { SignalRContext } from "../services/signal-r/SignalRContext";

const SendMessage = ({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) => {
    const [message, setMessage] = useState("");
    const conversationState = useContext(ConversationContext);
    const authUser = useAuthUser<AuthenticatedUser>();
    const signalRConnection = useContext(SignalRContext);


    const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }

        const messageToSend: Message = {
            id: crypto.randomUUID(),
            conversationId: conversationState!.currentConversation?.id,
            content: message,
            userId: authUser!.id,
            sender: authUser!.firstName,
            sentAt: new Date(),
        };
        const currentConversation = { ...conversationState!.currentConversation };
        if (currentConversation) {
            currentConversation.latestMessage = messageToSend.content;
            currentConversation.latestMessageAt = messageToSend.sentAt;
        }

        // conversationState?.setCurrentConversation(currentConversation!);
        const updatedConversations = conversationState!.conversations.map(conv =>
            conv.id === currentConversation.id ? currentConversation : conv
        );

        conversationState?.setConversations(updatedConversations);

        const sentMessage = await signalRConnection?.connection?.invoke("SendMessage", messageToSend);
        setMessages((prevMessages: Message[]) => [...prevMessages, sentMessage]);
        setMessage("");
    };

    return (
        <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center">
                <div className="p-2 text-gray-600 dark:text-gray-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="search-chat flex flex-grow p-2">
                    <form onSubmit={(event) => sendMessage(event)} className="send-message">
                        <input
                            id="messageInput"
                            className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md"
                            type="text"
                            placeholder="Type your message ..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                            <button type="submit">
                                <IoMdSend onMouseOver={({ target }) => target} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendMessage;