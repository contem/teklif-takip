import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Post()
  create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Offer> {
    return this.offersService.updateStatus(+id, status);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.offersService.remove(+id);
  }
}
