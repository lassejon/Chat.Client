import ConversationsBarItem from './ConversationsBarItem';
import { useContext } from 'react';
import { ConversationContext } from '../pages/ConversationPage';
const ConversationsBar = () => {
    const conversationState = useContext(ConversationContext);

    return (
        <div className="p-1">
            {
                conversationState?.conversations.map((item, index) => (
                    <ConversationsBarItem
                        key={index}
                        conversation={item}
                        active={item.id === conversationState.currentConversation?.id}
                    />
                ))
            }
        </div>
    )
}

export default ConversationsBar