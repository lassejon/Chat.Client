import { useContext, useState, useEffect } from "react";
import { ConversationContext } from "../pages/ConversationPage";
import { Participant } from "../dtos/responses/Conversation";

const CreateNewConversation = () => {
    const conversationState = useContext(ConversationContext)
    const [userResults, setUserResults] = useState<Participant[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Participant[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        conversationState?.setCreateConversation(true);
        conversationState?.setMessages([]);
    }, [conversationState]);

    useEffect(() => {
        if (!searchValue) {
            setUserResults([]);
            setShowDropdown(false);
            return;
        }

        const fetchUsers = async () => {
            const res = await fetch(`/api/users/search/${searchValue}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('_auth_type')} ${localStorage.getItem('_auth')}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUserResults(data);
                setShowDropdown(true);
                return;
            }

            setShowDropdown(false);
        }

        fetchUsers();
    }, [searchValue]);

    const handleSelectUser = (user: Participant) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.some((u) => u.id === user.id)) return prevSelectedUsers;

            const updatedSelectedUsers = [...prevSelectedUsers, user];
            conversationState?.setCreateConversationRequest((prevRequest) => ({
                ...prevRequest,
                participantIds: [...prevRequest.participantIds, user.id],
            }));
            return updatedSelectedUsers;
        });
    };

    const handleDeselectUser = (user: Participant) => {
        setSelectedUsers((prevSelectedUsers) => {
            const updatedSelectedUsers = prevSelectedUsers.filter((u) => u.id !== user.id);
            conversationState?.setCreateConversationRequest((prevRequest) => ({
                ...prevRequest,
                participantIds: prevRequest.participantIds.filter((id) => id !== user.id),
            }));
            return updatedSelectedUsers;
        });
    };


    return (
        <div className="relative p-3">
            <div className="search-chat flex p-3">
                <input
                    className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700 w-full rounded-l-md"
                    type="text"
                    placeholder="Search users"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div className="title-input flex p-3">
                    <input
                        className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700 w-full rounded-md"
                        type="text"
                        placeholder="Enter conversation title"
                        value={title}
                        onChange={(e) => {
                            conversationState?.setCreateConversationRequest((prevRequest) => ({
                                ...prevRequest,
                                title: e.target.value,
                            }));
                            setTitle(e.target.value)
                        }}
                    />
                </div>
            </div>

            {/* Dropdown menu for user results */}
            {userResults.length > 0 && (
                <div className="dropdown-menu bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                    {userResults.map((user) => (
                        <div key={user.id} className="flex justify-between items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                            <span className="text-gray-700 dark:text-gray-200">{user.firstName} {user.lastName}</span>
                            {selectedUsers.some((u) => u.id === user.id) ? (
                                <button onClick={() => handleDeselectUser(user)} className="text-red-500">Deselect</button>
                            ) : (
                                <button onClick={() => handleSelectUser(user)} className="text-green-500">Select</button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Display selected users */}
            <div className="selected-users p-3">
                {selectedUsers.map((user) => (
                    <div key={user.id} className="flex items-center p-1">
                        <span className="text-gray-700 dark:text-gray-200">{user.firstName} {user.lastName}</span>
                        <button onClick={() => handleDeselectUser(user)} className="ml-2 text-red-500">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateNewConversation;
