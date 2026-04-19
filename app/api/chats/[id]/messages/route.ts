import { NextRequest } from 'next/server'
import { addMessages, updateAssistantMessage, getChatMessagesPage } from '@/lib/repositories/chatRepository'
import { auth } from '@/auth'

// 分页查询消息记录
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }
  // 在query参数携带limited等参数
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const limit = Math.min(Number(searchParams.get('limit') || 10), 20)
  const beforeId = searchParams.get('beforeId') || undefined
  const beforeCreatedAt = searchParams.get('beforeCreatedAt') || undefined

  const data = await getChatMessagesPage(id, session.user.id, {
    limit,
    beforeId,
    beforeCreatedAt,
  })
  if (!data) {
    return Response.json({ error: 'Chat not found' }, { status: 404 })
  }

  return Response.json(data)
}

// 添加消息，并在首条用户消息写入时自动生成标题
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const { id } = await params
  const { userMessage, assistantMessage } = await req.json()

  const result = await addMessages(id, userMessage, assistantMessage, session.user.id)
  return Response.json({ success: true, updatedTitle: result.updatedTitle })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const { id } = await params
  const { messageId, content } = await req.json()

  await updateAssistantMessage(id, messageId, content ?? '', session.user.id)
  return Response.json({ success: true })
}
