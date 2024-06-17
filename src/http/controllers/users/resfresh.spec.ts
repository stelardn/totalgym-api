import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to refresh token', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.body).toEqual({
      token: expect.any(String)
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
