import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/testes/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a Check-In', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'Gym-01',
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gymId}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0
      })

    expect(response.statusCode).toBe(201)
  })
})
