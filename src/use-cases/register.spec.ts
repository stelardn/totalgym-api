import { describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUserRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register use case', () => {
  test('It should be able to register', async () => {
    const inMemoryUserRespository = new InMemoryUserRespository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRespository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@doe.com',
      password: '234567'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('It should hash user password upon registration', async () => {
    const inMemoryUserRespository = new InMemoryUserRespository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRespository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@doe.com',
      password: '234567'
    })

    const isUserCorrectlyHashed = await compare('234567', user.password_hash)

    expect(isUserCorrectlyHashed).toBe(true)
  })

  test('It should not be able to register with the same email twice', async () => {
    const inMemoryUserRespository = new InMemoryUserRespository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRespository)

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@doe.com',
      password: '234567'
    })

    await expect(async () => {
      return await registerUseCase.execute({
        name: 'John Doe',
        email: 'joh@doe.com',
        password: '234567'
      })
    }
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
