import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string(),
    phone: z.string(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { title, description, phone, latitude, longitude } = createGymSchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({
    title, description, phone, latitude, longitude
  })

  return await reply.status(201).send()
}
