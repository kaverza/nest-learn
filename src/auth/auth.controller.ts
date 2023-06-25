import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Signin } from './interfaces/dto/signin';
import { Signup } from './interfaces/dto/signup';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  public user(@Request() req) {
    return req.user;
  }
}
