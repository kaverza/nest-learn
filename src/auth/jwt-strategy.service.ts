import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { Signin } from './interfaces/dto/signin';
import { ShortUser } from './interfaces/dto/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate({ email }: ShortUser) {
    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
