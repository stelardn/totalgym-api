import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-respository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase () {
  const userRepository = new PrismaUserRepository()

  return new GetUserProfileUseCase(userRepository)
}
