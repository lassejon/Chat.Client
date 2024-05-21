// import MessageDto from '../dtos/requests/Message'
import Message from './Message'
import { ConversationContext } from './ChatBox'
import { useContext } from 'react'
import SendMessage from './SendMessage';
import CreateNewConversation from './CreateNewConversation';

const Chat = () => {
    const conversationState = useContext(ConversationContext)

    return (
        < div className="flex-grow h-full flex flex-col" >
            <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
                <div className="flex p-2 align-middle items-center">
                    <div className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>
                    <div className="border rounded-full border-white p-1/2">
                        <img className="w-14 h-14 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
                    </div>
                    {conversationState?.createConversation ?
                        <CreateNewConversation />
                        :
                        <>
                            <div className="flex-grow p-2 text-left">
                                <div className="text-md text-gray-50 font-semibold">{conversationState?.currentConversation?.name}</div>
                            </div>
                            <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
                {
                    conversationState?.messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))
                }
            </div>
            <SendMessage setMessages={conversationState!.setMessages} />
        </div >
    )
}

export default Chat