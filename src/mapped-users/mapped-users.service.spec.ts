import { Test, TestingModule } from '@nestjs/testing';

import { MappedUsersService } from './mapped-users.service';

describe('MappedUsersService', () => {
  let service: MappedUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MappedUsersService],
    }).compile();

    service = module.get<MappedUsersService>(MappedUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
