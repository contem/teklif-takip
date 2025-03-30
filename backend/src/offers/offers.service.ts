import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const customer = await this.customerRepository.findOneBy({
      id: createOfferDto.customerId,
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const offer = this.offerRepository.create({
      ...createOfferDto,
      customer,
    });

    return this.offerRepository.save(offer);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['customer'],
      order: { created_at: 'DESC' },
    });
  }
  async updateStatus(id: number, status: string): Promise<Offer> {
    const offer = await this.offerRepository.findOneBy({ id });
    if (!offer) throw new NotFoundException('Teklif bulunamadı');

    offer.status = status;
    return this.offerRepository.save(offer);
  }
  async remove(id: number): Promise<void> {
    const offer = await this.offerRepository.findOneBy({ id });
    if (!offer) throw new NotFoundException('Teklif bulunamadı');
    await this.offerRepository.delete(id);
  }
}
