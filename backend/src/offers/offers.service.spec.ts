import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Customer } from '../customers/entities/customer.entity';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        { provide: getRepositoryToken(Offer), useValue: {} },
        { provide: getRepositoryToken(Customer), useValue: {} },
      ],
    }).compile();
    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
