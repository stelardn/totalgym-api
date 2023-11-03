import { type UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute ({ name, email, password }: RegisterUseCaseRequest): Promise<void> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail != null) {
      throw new Error('Usuário já cadastrado com este email.')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash
    })
  }
}
