import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

describe('Get User Metrics Use Case', () => {
  let checkInRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricsUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('Should be able to get get checkins count from metrics', async () => {
    await checkInRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    })

    await checkInRepository.create({
        gym_id: 'gym-02',
        user_id: 'user-01'
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
