import { Prisma, type Gym } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findManyNearby: (params: FindManyNearbyParams) => Promise<Gym[]>
  searchMany: (query: string, page: number) => Promise<Gym[]>
  findById: (id: string) => Promise<Gym | null>
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
}
