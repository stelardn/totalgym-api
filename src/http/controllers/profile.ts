import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
const getUserProfile = makeGetUserProfileUseCase()

export async function profile (request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub
  })

  return await reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
}
