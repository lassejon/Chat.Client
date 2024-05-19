function MessageOutbound({ message, id }: { message: string, id: string }) {
    return (
        <div className="flex justify-end " id={id}>
            <div className="flex items-end w-3/4 max-w-80 bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
                <div className="p-2">
                    <div className="text-gray-200">
                        {message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageOutbound