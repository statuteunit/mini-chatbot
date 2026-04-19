// components/MessageList.tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Message } from '@/types/chat';
import { MessageItem } from '@/components/messageItem';

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  hasMore?: boolean
  isLoadingOlder?: boolean
  onLoadOlder?: () => void
}

export function MessageList({ messages, isLoading, hasMore = false, isLoadingOlder = false, onLoadOlder }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el || !onLoadOlder || isLoadingOlder || !hasMore) return

    if (el.scrollTop <= 80) {
      onLoadOlder()
    }
  }, [onLoadOlder, isLoadingOlder, hasMore])

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* 空状态 */}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-400">
          开始一段对话吧！
        </div>
      )}

      {/* 消息列表 */}
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      )}

      {/* 滚动锚点 */}
      <div ref={bottomRef} />
    </div>
  );
}