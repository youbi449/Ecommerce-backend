import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { tokenExpires } from 'src/utils/time';
import { loginUserDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  private userManager: Repository<User>;
  constructor(private usersService: UsersService, connection: Connection) {
    this.userManager = connection.getRepository(User);
  }

  async checkUser(loginUserDto: loginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const user = await this.userManager.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          exp: tokenExpires,
          data: { id: user.id, role: user.role },
        },
        process.env.SECRET_JWT,
      );
      return token;
    } else {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
  }
}
