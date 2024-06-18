import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/testes/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a Gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const profileResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-01',
        description: 'This is a valid Gym',
        phone: '80985858585',
        latitude: 0,
        longitude: 0
      })

    expect(profileResponse.statusCode).toBe(201)
  })
})
