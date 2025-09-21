import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from './common/decorators/auth.decorator';
import { TextTranslateDto } from './modules/text/dto/translate.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('translate')
  @Auth()
  @UsePipes(new ValidationPipe())
  async translate(@Body() dto: TextTranslateDto) {
    return this.appService.translate(dto);
  }
}
