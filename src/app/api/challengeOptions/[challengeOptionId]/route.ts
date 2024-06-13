import { challengeOptions, db } from '@/database'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export const GET = async (_: Request, { params }: { params: { challengeOptionId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, params.challengeOptionId),
  })

  return NextResponse.json(data)
}

export const PUT = async (request: Request, { params }: { params: { challengeOptionId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const body = await request.json()
  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, params.challengeOptionId))
    .returning()

  return NextResponse.json(data[0])
}

export const DELETE = async (_: Request, { params }: { params: { challengeOptionId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.delete(challengeOptions).where(eq(challengeOptions.id, params.challengeOptionId)).returning()

  return NextResponse.json(data[0])
}
