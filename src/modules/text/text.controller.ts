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
import { TextTranslateDto } from './dto/translate.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

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
