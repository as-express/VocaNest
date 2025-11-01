import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TextService } from './text.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { TextDto } from './dto/text.dto';
import { TextUpdDto } from './dto/text.upd';
import { TextTranslateDto } from './dto/translate.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('text')
@ApiTags('Text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  async newText(@Param('id') moduleId: string, @Body() dto: TextDto) {
    return this.textService.newText(dto, moduleId);
  }

  @Post('translate')
  @Auth()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  async translate(@Body() dto: TextTranslateDto) {
    return this.textService.translate(dto);
  }

  @Get('all/:id')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  async getTexts(@Param('id') moduleId: string) {
    return this.textService.getTexts(moduleId);
  }

  @Get('source')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'lang', required: true })
  @ApiQuery({ name: 'prefix', required: true })
  @ApiQuery({ name: 'limit', required: true })
  async getTextSource(
    @Query('lang') lang: string,
    @Query('prefix') prefix: string,
    @Query('limit') limit: number,
  ) {
    return this.textService.getSource(lang, prefix, +limit);
  }

  @Get('audio')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'lang', required: true })
  @ApiQuery({ name: 'text', required: true })
  async getAudioText(@Query('lang') lang: string, @Query('text') text: string) {
    return this.textService.getAudioText(lang, text);
  }

  @Get(':id')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  async getText(@Param('id') textId: string) {
    return this.textService.getText(textId);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  async updateText(@Param('id') textId: string, @Body() dto: TextUpdDto) {
    return this.textService.updateText(textId, dto);
  }

  @Delete(':id')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  async deleteText(@Param('id') textId: string) {
    return this.textService.deleteText(textId);
  }
}
