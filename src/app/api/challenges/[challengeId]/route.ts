import { challenges, db } from '@/database'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export const GET = async (_: Request, { params }: { params: { challengeId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, params.challengeId),
  })

  return NextResponse.json(data)
}

export const PUT = async (request: Request, { params }: { params: { challengeId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const body = await request.json()
  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, params.challengeId))
    .returning()

  return NextResponse.json(data[0])
}

export const DELETE = async (_: Request, { params }: { params: { challengeId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.delete(challenges).where(eq(challenges.id, params.challengeId)).returning()

  return NextResponse.json(data[0])
}
