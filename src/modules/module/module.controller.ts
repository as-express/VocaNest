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

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  async newModule(@reqUser('id') userId: string, @Body() dto: ModuleDto) {
    return this.moduleService.newModule(dto, userId);
  }

  @Get()
  @Auth()
  @HttpCode(200)
  async getModules(@reqUser('id') userId: string) {
    return this.moduleService.getModules(userId);
  }

  @Get(':id')
  @Auth()
  @HttpCode(200)
  async getModule(
    @reqUser('id') userId: string,
    @Param('id') moduleId: string,
  ) {
    return this.moduleService.getModule(moduleId, userId);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updateModule(
    @reqUser('id') userId: string,
    @Param('id') moduleId: string,
    @Body() dto: ModuleUpdDto,
  ) {
    return this.moduleService.updateModule(dto, moduleId, userId);
  }

  @Delete(':id')
  @Auth()
  async deleteModule(
    @reqUser('id') userId: string,
    @Param('id') moduleId: string,
  ) {
    return this.moduleService.deleteModule(moduleId, userId);
  }
}
