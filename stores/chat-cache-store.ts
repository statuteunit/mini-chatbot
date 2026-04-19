// 全局缓存，管理所有chats
import { create } from 'zustand'
import type { Message } from '@/types/chat'

// 单个chat摘要
export interface ChatSummary {
  id: string
  title: string
  model: string
  updatedAt: string
}

export interface MessageCursor {
  beforeId: string
  beforeCreatedAt: string
}

// 消息缓存
export interface ChatMessageCache {
  recentMessages: Message[]
  hasMore: boolean
  nextCursor: MessageCursor | null
  loadedAt: number
}

// chats仓库类型
interface ChatCacheState {
  chats: ChatSummary[]
  chatsLoaded: boolean
  messageCache: Record<string, ChatMessageCache>

  setChats: (chats: ChatSummary[]) => void
  upsertChat: (chat: ChatSummary) => void
  removeChat: (chatId: string) => void
  invalidateChats: () => void

  setChatSnapshot: (
    chatId: string,
    visibleMessages: Message[],
    hasMore: boolean,
    nextCursor: MessageCursor | null,
  ) => void

  clearChatSnapshot: (chatId: string) => void
}

export const useChatCacheStore = create<ChatCacheState>((set) => ({
  chats: [],
  chatsLoaded: false,
  messageCache: {},
  setChats: (chats) =>
    set({
      chats: Array.isArray(chats) ? chats : [],
      chatsLoaded: true,
    }),
  // 更新或传入chat
  upsertChat: (chat) =>
    set((state) => {
      const exists = state.chats.some((item) => item.id === chat.id)
      const chats = exists ? state.chats.map((item) => item.id === chat.id ? chat : item) : [chat, ...state.chats]
      return { chats }
    }),
  removeChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((item) => item.id !== chatId)
    })),
  // 重新获取
  invalidateChats: () =>
    set({
      chatsLoaded: false
    }),
  setChatSnapshot: (chatId, visibleMessages, hasMore, nextCursor) =>
    set((state) => ({
      messageCache: {
        ...state.messageCache,
        [chatId]: {
          recentMessages: visibleMessages,
          hasMore,
          nextCursor,
          loadedAt: Date.now()
        },
      },
    })),
  clearChatSnapshot: (chatId) =>
    set((state) => {
      const next = { ...state.messageCache }
      delete next[chatId]
      return { messageCache: next }
    })
}))