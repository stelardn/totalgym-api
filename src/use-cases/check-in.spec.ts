import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository copy'

describe('Check-in use case', () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRespository
  let sut: CheckInUseCase

  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRespository()
    sut = new CheckInUseCase(inMemoryCheckInRepository)
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
