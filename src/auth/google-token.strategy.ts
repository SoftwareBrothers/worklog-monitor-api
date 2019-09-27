import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-token';
import { ConfigService } from 'nestjs-config';

import { Nullable } from '../utils/types';

import { GoogleUser } from './interfaces/google-user.interface';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('google.clientID'),
      clientSecret: configService.get('google.clientSecret'),
    });
  }

  public async validate(_token: string, _refreshToken: Nullable<string>, user: GoogleUser) {
    return user;
  }
}