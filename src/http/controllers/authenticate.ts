import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({
      email,
      password
    })

    return await reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(401).send({
        message: error.message
      })
    }

    throw error
  }
}
