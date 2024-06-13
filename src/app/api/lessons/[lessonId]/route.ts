import { lessons, db } from '@/database'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export const GET = async (_: Request, { params }: { params: { lessonId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.query.courses.findFirst({
    where: eq(lessons.id, params.lessonId),
  })

  return NextResponse.json(data)
}

export const PUT = async (request: Request, { params }: { params: { lessonId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const body = await request.json()
  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, params.lessonId))
    .returning()

  return NextResponse.json(data[0])
}

export const DELETE = async (_: Request, { params }: { params: { lessonId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.delete(lessons).where(eq(lessons.id, params.lessonId)).returning()

  return NextResponse.json(data[0])
}
