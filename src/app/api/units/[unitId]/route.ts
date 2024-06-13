import { units, db } from '@/database'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export const GET = async (_: Request, { params }: { params: { unitId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, params.unitId),
  })

  return NextResponse.json(data)
}

export const PUT = async (request: Request, { params }: { params: { unitId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const body = await request.json()
  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, params.unitId))
    .returning()

  return NextResponse.json(data[0])
}

export const DELETE = async (_: Request, { params }: { params: { unitId: number } }) => {
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const data = await db.delete(units).where(eq(units.id, params.unitId)).returning()

  return NextResponse.json(data[0])
}
