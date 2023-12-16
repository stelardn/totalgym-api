import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

describe('Fetch nearby gyms use case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to search for nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near-Gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Far-Gym',
      description: null,
      phone: null,
      latitude: 10,
      longitude: 10,
    })

    const { gyms } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
        expect.objectContaining({title: 'Near-Gym'}),
    ])
  })
})
