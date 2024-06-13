import { NextResponse } from 'next/server'
import { db, lessons } from '@/database'
import { isAdmin } from '@/lib/admin'

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const data = await db.query.lessons.findMany()

  return NextResponse.json(data)
}

export const POST = async (request: Request) => {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const body = await request.json()
  const data = await db
    .insert(lessons)
    .values({
      ...body,
    })
    .returning()

  return NextResponse.json(data[0])
}
