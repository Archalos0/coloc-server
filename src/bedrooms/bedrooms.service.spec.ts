import { Test, TestingModule } from '@nestjs/testing';
import { BedroomsService } from './bedrooms.service';

describe('BedroomsService', () => {
  let service: BedroomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedroomsService],
    }).compile();

    service = module.get<BedroomsService>(BedroomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
