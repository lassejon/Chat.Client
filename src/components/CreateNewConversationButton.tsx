import { IoCreateOutline } from "react-icons/io5";
import { useContext } from "react";
import { ConversationContext } from "../pages/ConversationPage";

const CreateNewConversationButton = () => {
    const conversationState = useContext(ConversationContext)
    const createNewConversation = () => {
        conversationState?.setCreateConversation(true);
    }

    return (
        <button className="justify-end text-white">
            <IoCreateOutline onClick={createNewConversation} />
        </button>
    )
}

export default CreateNewConversationButton