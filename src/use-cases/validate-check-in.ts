import dayjs from 'dayjs'
import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor (
    private readonly checkInsRepository: CheckInsRepository,
  ) {}

  async execute ({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const now = new Date()

    const intervalInMinutesSinceCreation = dayjs(now).diff(checkIn.created_at, 'minutes')

    const LIMIT_INTERVAL_FOR_VALIDATION_IN_MINUTES = 20

    if (intervalInMinutesSinceCreation > LIMIT_INTERVAL_FOR_VALIDATION_IN_MINUTES) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = now

    await this.checkInsRepository.update(checkIn)

    return { checkIn }
  }
}
