import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio) private port: Repository<Portfolio>,
  ) {}

  createPortfolio(
    title: string,
    imageUrl: string,
    strategy: string,
    background: string,
    execution: string,
    creative: string,
    people: any[],
  ) {
    const portfolio = this.port.create({
      title: title,
      imageUrl: imageUrl,
      strategy: strategy,
      background: background,
      execution: execution,
      creative: creative,
      people: people,
    });
    return this.port.save(portfolio);
  }

  findOne(id: number) {
    return this.port.findOne({ where: { id } });
  }

  findAll(title: string) {
    return this.port.find({ where: { title } });
  }

  async update(id: number, attrs: Partial<Portfolio>) {
    const port = await this.findOne(id);

    if (!port) {
      throw new NotFoundException('Not found');
    }

    Object.assign(id, attrs);
    return this.port.save(port);
  }

  async remove(id: number) {
    const port = await this.findOne(id);

    if (!port) {
      throw new NotFoundException('Not found');
    }
    return this.port.remove(port);
  }

  async uploadFile(file: {
    filename: string;
    filepath: string;
    mimetype: string;
    size: number;
  }) {
    const fileRecord = this.port.create({
      uploadFile: {
        filename: file.filename,
        filepath: file.filepath,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
    return this.port.save(fileRecord);
  }
}
