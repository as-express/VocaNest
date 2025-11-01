import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TextTranslateDto } from './modules/text/dto/translate.dto';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('translate')
  @UsePipes(new ValidationPipe())
  async translate(@Body() dto: TextTranslateDto) {
    return this.appService.translate(dto);
  }
}
