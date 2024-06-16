import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/testes/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search for nearby Gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-01',
        description: 'This is a valid Gym',
        phone: '80985858585',
        latitude: 0,
        longitude: 0
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-02',
        description: 'This is another valid Gym',
        phone: '80985858585',
        latitude: 10,
        longitude: 10
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 10,
        longitude: 10
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym-02'
      })
    ])
  })
})
