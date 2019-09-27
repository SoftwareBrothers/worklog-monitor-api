import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public healthCheck() {
    return {
      valera: 'mic check',
    };
  }
}
