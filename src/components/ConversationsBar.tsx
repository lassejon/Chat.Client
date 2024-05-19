import ConversationsBarItem from './ConversationsBarItem';
import Conversation from '../dtos/responses/Conversation';
const ConversationsBar = ({ conversations }: { conversations: Conversation[] }) => {

    return (
        <div className="p-1">
            {
                conversations.map((item, index) => (
                    <ConversationsBarItem
                        key={index}
                        conversation={item}
                        active={index === 0 ? true : false}
                    />
                ))
            }
        </div>
    )
}

export default ConversationsBar