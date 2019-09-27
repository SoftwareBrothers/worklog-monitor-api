import { HttpModuleOptions, HttpModuleOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class CalamariConfig implements HttpModuleOptionsFactory {
  constructor(private readonly config: ConfigService) { }

  public createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.config.get('calamari.url'),
      auth: {
        username: this.config.get('calamari.username'),
        password: this.config.get('calamari.password'),
      },
    };
  }
}
