import { FetchUserCheckInsHistoryUseCase } from '../fetch-member-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchMemberCheckInsHistoryUseCase () {
  const checkInsRepository = new PrismaCheckInsRepository()

  return new FetchUserCheckInsHistoryUseCase(checkInsRepository)
}
