import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Signin } from './interfaces/dto/signin';
import { Signup } from './interfaces/dto/signup';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  public signup(@Body() dto: Signup) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public signin(@Body() dto: Signin) {
    return this.authService.signin(dto);
  }
}
