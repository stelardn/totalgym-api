import { type FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { jwtVerify } from '../../middlewares/jwt-verify'
import { refresh } from './refresh'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // Authenticated
  app.get('/me', { onRequest: [jwtVerify] }, profile)
}
