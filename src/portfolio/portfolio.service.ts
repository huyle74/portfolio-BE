import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { createPortDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio) private port: Repository<Portfolio>,
  ) {}

  async createPortfolio(createPortDto: createPortDto) {
    const portfolio = this.port.create(createPortDto);
    return await this.port.save(portfolio);
  }

  findOne(id: number) {
    return this.port.findOne({ where: { id } });
  }

  findAll(title: string) {
    return this.port.find({ where: { title } });
  }

  async update(id: number, attrs: Partial<Portfolio>) {
    const res = await this.findOne(id);
    if (!res) {
      throw new NotFoundException('Not found');
    }
    Object.assign(res, attrs);
    return this.port.save(res);
  }

  async remove(id: number) {
    const res = await this.findOne(id);

    if (!res) {
      throw new NotFoundException('Not found');
    }
    return this.port.remove(res);
  }
}


