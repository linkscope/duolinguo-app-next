import { courses, db } from '@/database'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export const GET = async (request: Request, { params }: { params: { courseId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, params.courseId),
  })

  return NextResponse.json(data)
}

export const PUT = async (request: Request, { params }: { params: { courseId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const body = await request.json()
  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, params.courseId))
    .returning()

  return NextResponse.json(data)
}

export const DELETE = async (_: Request, { params }: { params: { courseId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.delete(courses).where(eq(courses.id, params.courseId)).returning()

  return NextResponse.json(data)
}
