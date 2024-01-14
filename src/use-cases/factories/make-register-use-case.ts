import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-respository'

export function makeRegisterUseCase () {
  const userRepository = new PrismaUserRepository()

  return new RegisterUseCase(userRepository)
}
