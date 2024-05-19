import Conversation from '../dtos/responses/Conversation'
import { useContext } from 'react'
import { ConversationContext } from './ChatBox'

const ConversationsBarItem = ({ conversation, active }: { conversation: Conversation, active: boolean }) => {
    const conversationState = useContext(ConversationContext);
    const _class = active ? 'bg-gray-200' : 'bg-white';
    return (
        <div>
            <div className={'conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md ' + _class} onClick={() => conversationState.setCurrentConversation(conversation)} >
                <div className={'flex items-center p-2  cursor-pointer  '}>
                    <div className="w-7 h-7 m-1">
                        <img className="rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md ">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{conversation.name}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-300">{conversation.lastMessageTime}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
                            {conversation.lastMessage}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationsBarItem