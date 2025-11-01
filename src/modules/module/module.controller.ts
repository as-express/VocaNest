import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { reqUser } from 'src/common/decorators/req-user.decorator';
import { ModuleDto } from './dto/module.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ModuleUpdDto } from './dto/module.upd.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('module')
@ApiTags('Module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @UsePipes(new ValidationPipe())
  async newModule(@reqUser('id') userId: string, @Body() dto: ModuleDto) {
    return this.moduleService.newModule(dto, userId);
  }

  @Get()
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @HttpCode(200)
  async getModules(@reqUser('id') userId: string) {
    return this.moduleService.getModules(userId);
  }

  @Get(':id/quiz')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  @HttpCode(200)
  async getQuiz(@Param('id') moduleId: string) {
    return this.moduleService.getQuiz(moduleId);
  }

  @Get(':id')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  @HttpCode(200)
  async getModule(@Param('id') moduleId: string) {
    return this.moduleService.getModule(moduleId);
  }

  @Put(':id')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  @UsePipes(new ValidationPipe())
  async updateModule(@Param('id') moduleId: string, @Body() dto: ModuleUpdDto) {
    return this.moduleService.updateModule(dto, moduleId);
  }

  @Delete(':id')
  @Auth()
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', required: true })
  async deleteModule(@Param('id') moduleId: string) {
    return this.moduleService.deleteModule(moduleId);
  }
}
