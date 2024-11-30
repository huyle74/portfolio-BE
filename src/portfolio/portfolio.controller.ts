import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Redirect,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createPortDto } from './dto/create-portfolio.dto';
import { UpdatePortDto } from './dto/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(public portfolioService: PortfolioService) {}
  @Get()
  listAllPortfolio(@Query('title') title: string) {
    const res = this.portfolioService.findAll(title);
    console.log(res);
    return res;
  }

  @Post('/create-portfolio')
  @Redirect('http://localhost:3001/admin')
  createPortfolio(@Body() body: createPortDto) {
    return this.portfolioService.createPortfolio(
      body.title,
      body.imageUrl,
      body.strategy,
      body.background,
      body.execution,
      body.creative,
      body.people,
    );
  }

  @Get('/:id')
  getPortfolio(@Param('id') id: string) {
    return this.portfolioService.findOne(parseInt(id));
  }

  @Delete('/:id')
  deletePort(@Param('id') id: string) {
    return this.portfolioService.remove(parseInt(id));
  }

  @Patch('/:id')
  updatePortfolio(@Param('id') id: string, @Body() body: UpdatePortDto) {
    return this.portfolioService.update(parseInt(id), body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const upload = this.portfolioService.uploadFile({
      filename: file.filename,
      filepath: file.path,
      mimetype: file.mimetype,
      size: file.size,
    }); 
    console.log(file);
    return {   
      message: 'File uploaded successfully',
      upload,
    };
  }
}
