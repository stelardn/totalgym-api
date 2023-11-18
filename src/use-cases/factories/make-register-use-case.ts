import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRespository } from '@/repositories/prisma/prisma-users-respository'

export function makeRegisterUseCase () {
  const userRespository = new PrismaUserRespository()
  const registerUseCase = new RegisterUseCase(userRespository)

  return registerUseCase
}
