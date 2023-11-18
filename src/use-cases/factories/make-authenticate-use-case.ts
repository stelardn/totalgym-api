import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUserRespository } from '@/repositories/prisma/prisma-users-respository'

export function makeAuthenticateUseCase () {
  const userRespository = new PrismaUserRespository()
  const authenticateUseCase = new AuthenticateUseCase(userRespository)

  return authenticateUseCase
}
