import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-member-check-ins-history'

describe('Fetch user check-in history use case', () => {
  let checkInRepository: InMemoryCheckInsRepository
  let sut: FetchUserCheckInsHistoryUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('Should be able to fetch user check in history', async () => {
    await checkInRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    })

    await checkInRepository.create({
        gym_id: 'gym-02',
        user_id: 'user-01'
    })
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-01'}),
        expect.objectContaining({gym_id: 'gym-02'})
    ])
  })
  
  it('Should be able to fetch paginated user check in history', async () => {
    for (let i = 1; i <= 22; i++) {
        await checkInRepository.create({
            gym_id: `gym-${i}`,
            user_id: 'user-01'
        })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-21'}),
        expect.objectContaining({gym_id: 'gym-22'})
    ])
  })
})
