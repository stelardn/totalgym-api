import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function jwtVerify (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return await reply.status(401).send({ message: 'Invalid authorization token. ' })
  }
}
