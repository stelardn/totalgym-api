import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { type GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBeweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNummberOfCheckInsError } from './errors/max-number-of-check-ins-error copy'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute ({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const userCoordinates = {
      latitude: userLatitude,
      longitude: userLongitude
    }

    const gymCoordinates = {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber()
    }

    const distanceInKm = getDistanceBeweenCoordinates(userCoordinates, gymCoordinates)

    const MAX_DISTANCE_IN_KM = 0.1

    if (distanceInKm > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate !== null) {
      throw new MaxNummberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return { checkIn }
  }
}
