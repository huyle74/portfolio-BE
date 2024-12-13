import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { createPortDto } from './dto/create-portfolio.dto';
import { UpdatePortDto } from './dto/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';
import { GoogleServiceStorage } from './core/google.storage';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    public portfolioService: PortfolioService,
    private googleStorage: GoogleServiceStorage,
  ) {}

  @Get()
  listAllPortfolio(@Query('title') title: string) {
    const res = this.portfolioService.findAll(title);
    return res;
  }

  @Post('/create-portfolio')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async createPortfolio(
    @Body() body: createPortDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const imageUpload = await this.googleStorage.uploadFile(file);

    return await this.portfolioService.createPortfolio({
      uploadFile: imageUpload.publicUrl,
      ...body,
    });
  }

  @Get('/:id')
  getPortfolio(@Param('id') id: string) {
    return this.portfolioService.findOne(parseInt(id));
  }

  @Delete('/:id')
  deletePort(@Param('id') id: string) {
    return this.portfolioService.remove(parseInt(id));
  }

  @Patch(':id')
  updatePortfolio(@Param('id') id: string, @Body() body: UpdatePortDto) {
    return this.portfolioService.update(parseInt(id), body);
  }
}
