import { Test, TestingModule } from '@nestjs/testing';
import { BedroomsController } from './bedrooms.controller';

describe('BedroomsController', () => {
  let controller: BedroomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedroomsController],
    }).compile();

    controller = module.get<BedroomsController>(BedroomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
