import { prisma } from '@/lib/prisma'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = createUserSchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password
    }
  })

  return await reply.status(201).send()
}
