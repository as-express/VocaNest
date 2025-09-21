import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TextService } from './text.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { TextDto } from './dto/text.dto';
import { TextUpdDto } from './dto/text.upd';

@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async newText(@Param('id') moduleId: string, @Body() dto: TextDto) {
    return this.textService.newText(dto, moduleId);
  }

  @Get()
  @Auth()
  async getTexts(@Param('id') moduleId: string) {
    return this.textService.getTexts(moduleId);
  }

  @Get(':id')
  @Auth()
  async getText(@Param('id') textId: string) {
    return this.textService.getText(textId);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updateText(@Param('id') textId: string, @Body() dto: TextUpdDto) {
    return this.textService.updateText(textId, dto);
  }

  @Delete(':id')
  @Auth()
  async deleteText(@Param('id') textId: string) {
    return this.textService.deleteText(textId);
  }
}
