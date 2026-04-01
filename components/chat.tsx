'use client'

import { useChat } from "@/hooks/useChat"
import { MessageList } from "@/components/ui/messageList"
import { ChatInput } from "@/components/ui/chatInput"

export function Chat() {
    const { messages, input, setInput, isLoading, append, reload, stop } = useChat()
    const handleSubmit = () => {
        append(input)
    }

    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto">
            {/* 标题栏 */}
            <header className="p-4 border-b">
                <h1 className="text-xl font-bold">AI Chat</h1>
                <p className="text-sm text-gray-500">Powered by Ollama</p>
            </header>

            {/* 消息列表 */}
            <MessageList messages={messages} isLoading={isLoading} />

            {/* 输入框 */}
            <ChatInput
                input={input}
                isLoading={isLoading}
                onInputChange={setInput}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
