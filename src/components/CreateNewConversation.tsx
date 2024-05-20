import { IoCreateOutline } from "react-icons/io5";

const CreateNewConversation = () => {
    const createNewConversation = () => { }

    return (
        <button className="justify-end text-white">
            <IoCreateOutline onClick={createNewConversation} />
        </button>
    )
}

export default CreateNewConversation