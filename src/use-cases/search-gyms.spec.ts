import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

describe('Search gyms use case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Gym-01',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Gym-02',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
        expect.objectContaining({title: 'Gym-01',}),
        expect.objectContaining({title: 'Gym-02'})
    ])
  })
  
  it('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
        await gymsRepository.create({
            title: `gym-${i}`,
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
        expect.objectContaining({title: 'gym-21'}),
        expect.objectContaining({title: 'gym-22'})
    ])
  })
})
