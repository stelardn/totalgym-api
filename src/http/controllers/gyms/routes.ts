import { jwtVerify } from '@/http/middlewares/jwt-verify'
import { type FastifyInstance } from 'fastify'
import { search } from './search'
import { fetchNearby } from './fetch-nearby'
import { create } from './create'
import { verififyAuthorization } from '@/http/middlewares/verify-authorization'

export async function gymsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', jwtVerify)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', fetchNearby)

  app.post('/gyms', { onRequest: [verififyAuthorization('ADMIN')] }, create)
}
