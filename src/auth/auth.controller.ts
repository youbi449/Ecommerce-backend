import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { loginUserDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('/')
  async auth (@Body() loginUserDto: loginUserDto) {
    const token = await this.authService.checkUser(loginUserDto)
    return token
  }
}
