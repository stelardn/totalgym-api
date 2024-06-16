import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/testes/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-Ins History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get Check-Ins History', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'Gym-01',
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0
      }
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gymId,
          user_id: user.id
        },
        {
          gym_id: gymId,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        user_id: user.id,
        gym_id: gymId
      }),
      expect.objectContaining({
        user_id: user.id,
        gym_id: gymId
      })
    ])
  })
})
