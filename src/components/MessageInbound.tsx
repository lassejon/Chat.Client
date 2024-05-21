import Message from "../dtos/requests/Message";
import { useContext } from "react";
import { ConversationContext } from "./ConversationPage";
import formatDate from "../services/DateFormatter";

function MessageInbound({ message }: { message: Message }) {
    const authenticationState = useContext(ConversationContext);
    const messageSender = authenticationState?.currentConversation?.participants.find(participant => participant.id === message.userId);

    const dateString = formatDate(message.sentAt)

    return (
        <div className="flex items-end w-3/4 align text-left" id={message.id}>
            {/* <img className="w-8 h-8 m-3 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" /> */}
            <div className="w-8 m-3 rounded-full" />
            <div className="p-3 bg-purple-300 dark:bg-gray-800 mx-3 my-1 max-w-80 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
                <div className="text-xs text-gray-600 dark:text-gray-200">
                    {messageSender?.firstName}
                </div>
                <div className="text-xs text-gray-100 hidden dark:text-gray-200">
                    {message.userId}
                </div>
                <div className="text-gray-700 dark:text-gray-200">
                    {message.content}
                </div>
                <div className="text-xs text-gray-400">
                    <p>{dateString}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageInbound