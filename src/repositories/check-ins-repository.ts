import { type CheckIn, type Prisma } from '@prisma/client'

export interface CheckInsRepository {
  update: (checkIn: CheckIn) => Promise<CheckIn>
  findById: (id: string) => Promise<CheckIn | null>
  countByUserId: (userId: string) => Promise<number>
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findByUserIdOnDate: (user_id: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (user_id: string, page: number) => Promise<CheckIn[]>
}
