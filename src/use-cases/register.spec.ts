import { beforeEach, describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUserRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register use case', () => {
  let inMemoryUserRespository: InMemoryUserRespository
  let sut: RegisterUseCase

  beforeEach(() => {
    inMemoryUserRespository = new InMemoryUserRespository()
    sut = new RegisterUseCase(inMemoryUserRespository)
  })

  test('It should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'joh@doe.com',
      password: '234567'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('It should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'joh@doe.com',
      password: '234567'
    })

    const isUserCorrectlyHashed = await compare('234567', user.password_hash)

    expect(isUserCorrectlyHashed).toBe(true)
  })

  test('It should not be able to register with the same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'joh@doe.com',
      password: '234567'
    })

    await expect(async () => {
      return await sut.execute({
        name: 'John Doe',
        email: 'joh@doe.com',
        password: '234567'
      })
    }
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
