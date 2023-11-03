import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRespository } from '@/repositories/prisma/prisma-users-respository'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = createUserSchema.parse(request.body)

  try {
    const userRespository = new PrismaUserRespository()
    const registerUseCase = new RegisterUseCase(userRespository)
    await registerUseCase.execute({
      name,
      email,
      password
    })

    return await reply.status(201).send()
  } catch (error) {
    return await reply.status(409).send()
  }
}
