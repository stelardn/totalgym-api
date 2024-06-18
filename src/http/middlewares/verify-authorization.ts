import { type FastifyReply } from 'fastify/types/reply'
import { type FastifyRequest } from 'fastify/types/request'

export function verififyAuthorization (roleToVerifiy: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== roleToVerifiy) {
      return await reply.status(403).send({ message: 'Unauthorized.' })
    }
  }
}
