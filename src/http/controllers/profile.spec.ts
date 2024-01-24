import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'jane@doe.com',
        password: '123456'
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'jane@doe.com',
        password: '123456'
      })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jane@doe.com'
      })
    )
  })
})
