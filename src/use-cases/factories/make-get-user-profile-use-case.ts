import { PrismaUserRespository } from '@/repositories/prisma/prisma-users-respository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase () {
  const userRepository = new PrismaUserRespository()

  return new GetUserProfileUseCase(userRepository)
}
