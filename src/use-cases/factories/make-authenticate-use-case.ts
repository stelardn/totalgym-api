import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-respository'

export function makeAuthenticateUseCase () {
  const userRespository = new PrismaUserRepository()

  return new AuthenticateUseCase(userRespository)
}
