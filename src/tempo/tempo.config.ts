import { HttpModuleOptions, HttpModuleOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class TempoConfig implements HttpModuleOptionsFactory {
  constructor(private readonly config: ConfigService) { }

  public createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.config.get('tempo.url'),
      headers: {
        'Authorization': `Bearer ${this.config.get('tempo.token')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }
}
