import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'

describe('Check-in use case', () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRespository
  let sut: CheckInUseCase

  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRespository()
    sut = new CheckInUseCase(inMemoryCheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    await expect(async () =>
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
