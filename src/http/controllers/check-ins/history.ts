import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchMemberCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-member-check-ins-history-use-case'

export async function history (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const fetchUserCheckInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = fetchUserCheckInsHistoryQuerySchema.parse(request.query)

  const fecthUserCheckInsHistoryUseCase = makeFetchMemberCheckInsHistoryUseCase()
  const { checkIns } = await fecthUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub
  })

  return await reply.status(200).send({
    checkIns
  })
}
