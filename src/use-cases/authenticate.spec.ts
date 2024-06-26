import { beforeEach, describe, expect, test } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register use case', () => {
  let usersRespository: InMemoryUserRespository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRespository = new InMemoryUserRespository()
    sut = new AuthenticateUseCase(usersRespository)
  })

  test('It should be able to authenticate', async () => {
    await usersRespository.create({
      name: 'John Doe',
      email: 'joh@doe.com',
      password_hash: await hash('234567', 6)
    })

    const { user } = await sut.execute({
      email: 'joh@doe.com',
      password: '234567'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('It should not be able to authenticate with wrong email', async () => {
    await expect(async () =>
      await sut.execute({
        email: 'joh@doe.com',
        password: '234567'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('It should not be able to authenticate with wrong email', async () => {
    await usersRespository.create({
      name: 'John Doe',
      email: 'joh@doe.com',
      password_hash: await hash('234567', 6)
    })

    await expect(async () =>
      await sut.execute({
        email: 'joh@doe.com',
        password: '456789'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
