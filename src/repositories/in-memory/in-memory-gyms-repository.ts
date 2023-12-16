import { Prisma, type Gym } from '@prisma/client'
import { FindManyNearbyParams, type GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { getDistanceBeweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []
  
  async findById (id: string) {
    const gym = this.items.find(item => item.id === id) ?? null
    
    return gym
  }
  
  async findManyNearby(params: FindManyNearbyParams) {
    const LIMIT_DISTANCE_IN_KM = 10
    return this.items.filter(item => {
      const distance = getDistanceBeweenCoordinates(
        {latitude: params.latitude, longitude: params.longitude},
        {
          latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()
        }
      )

      return distance < LIMIT_DISTANCE_IN_KM
    })
  }

  async searchMany(query: string, page: number) {
    return this.items.filter(gym => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create (data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }

    this.items.push(gym)

    return gym
  }
}
