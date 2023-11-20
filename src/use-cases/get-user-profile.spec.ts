import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUserRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Register use case', () => {
  let usersRespository: InMemoryUserRespository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRespository = new InMemoryUserRespository()
    sut = new GetUserProfileUseCase(usersRespository)
  })

  test('It should be able to authenticate', async () => {
    const createdUser = await usersRespository.create({
      name: 'John Doe',
      email: 'joh@doe.com',
      password_hash: await hash('234567', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.name).toEqual('John Doe')
  })

  test('It should not be able to authenticate with wrong id', async () => {
    await expect(async () =>
      await sut.execute({
        userId: 'Non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
