import { useState, useContext } from "react";
import { IoMdSend } from "react-icons/io";
import { ConversationContext } from "./ChatBox";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AuthenticatedUser from "../dtos/responses/AuthenticatedUser";

const SendMessage = ({ setMessages }) => {
    const [message, setMessage] = useState("");
    const conversationState = useContext(ConversationContext);
    const authUser = useAuthUser<AuthenticatedUser>();
    const sendMessage = (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }
        console.log(message);
        setMessage("");

        // send message to server
        setMessages((prevMessages) => {
            const messageToSend = {
                id: prevMessages.length + 1,
                chatId: conversationState.currentConversation.id,
                message: message,
                senderId: authUser?.id,
                sender: authUser?.firstName,
                time: new Date().toISOString(),
            };

            const currentConversation = conversationState.currentConversation;
            currentConversation.lastMessage = messageToSend.message;
            currentConversation.lastMessageTime = messageToSend.time;
            conversationState.setCurrentConversation(currentConversation);
            return [
                ...prevMessages,
                messageToSend
            ];
        });
    };

    // const sendMessage = async (event) => {
    //     event.preventDefault();
    //     if (message.trim() === "") {
    //         alert("Enter valid message");
    //         return;
    //     }
    //     const { uid, displayName, photoURL } = auth.currentUser;
    //     await addDoc(collection(db, "messages"), {
    //         text: message,
    //         name: displayName,
    //         avatar: photoURL,
    //         createdAt: serverTimestamp(),
    //         uid,
    //     });
    //     setMessage("");
    //     scroll.current.scrollIntoView({ behavior: "smooth" });
    // };
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
        // <form onSubmit={(event) => sendMessage(event)} className="send-message">
        //     <label htmlFor="messageInput" hidden>
        //         Enter Message
        //     </label>
        //     <input
        //         id="messageInput"
        //         name="messageInput"
        //         type="text"
        //         className="form-input__input"
        //         placeholder="type message..."
        //         value={message}
        //         onChange={(e) => setMessage(e.target.value)}
        //     />
        //     <button type="submit">Send</button>
        // </form>
    );
};

export default SendMessage;