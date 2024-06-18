import { jwtVerify } from '@/http/middlewares/jwt-verify'
import { type FastifyInstance } from 'fastify'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'
import { verififyAuthorization } from '@/http/middlewares/verify-authorization'

export async function checkInsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', jwtVerify)

  app.post('/gyms/:gymId/check-in', create)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.patch('/check-ins/:checkInId/validate', { onRequest: [verififyAuthorization('ADMIN')] }, validate)
}
