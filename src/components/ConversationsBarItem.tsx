// ConversationsBarItem.tsx
import React, { useContext } from 'react';
import Conversation from '../dtos/responses/Conversation';
import { ConversationContext } from './ChatBox';
import formatDate from '../services/DateFormatter';

const ConversationsBarItem: React.FC<{ conversation: Conversation; active: boolean }> = ({ conversation, active }) => {
    const conversationState = useContext(ConversationContext);
    const _class = active ? 'bg-gray-200' : 'bg-white';

    const selectConversation = () => {
        conversation.unreadMessages = 0;
        conversationState?.setCurrentConversation(conversation)
        const conversations = conversationState!.conversations.map(conv =>
            conv.id === conversation.id ? conversation : conv
        );
        conversationState?.setConversations(conversations);
    };

    return (
        <div>
            <div
                className={`conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md ${_class}`}
                onClick={selectConversation}
            >
                <div className="flex items-center p-2 cursor-pointer">
                    <div className="w-7 h-7 m-1">
                        <img className="rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{conversation.name}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-300">{formatDate(conversation.latestMessageAt)}</div>
                        </div>
                        <div className="text-left text-sm text-gray-500 dark:text-gray-400 w-40 truncate">{conversation.latestMessage}</div>
                    </div>
                    {conversation.unreadMessages > 0 && (
                        <div className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadMessages}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationsBarItem;
