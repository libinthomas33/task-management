import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto);
  }
}
