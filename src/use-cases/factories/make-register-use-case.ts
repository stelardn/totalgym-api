import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRespository } from '@/repositories/prisma/prisma-users-respository'

export function makeRegisterUseCase () {
  const userRepository = new PrismaUserRespository()

  return new RegisterUseCase(userRepository)
}
