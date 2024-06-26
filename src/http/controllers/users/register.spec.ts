import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'jane@doe.com',
        password: '123456'
      })

    expect(response.statusCode).toBe(201)
  })
})
