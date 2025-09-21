import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { Module } from 'src/database/schemas/module.schema';
import { Text } from 'src/database/schemas/text.schema';
import { ModuleDto } from './dto/module.dto';
import { ModuleUpdDto } from './dto/module.upd.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private readonly moduleSchema: Model<Module>,
  ) {}

  async newModule(dto: ModuleDto, userId: string) {
    const isHave = await this.moduleSchema.findOne({
      userId,
      title: dto.title,
    });
    if (isHave) throw new BadRequestException('Module is already exist');

    const module = await this.moduleSchema.create({ ...dto, userId });
    await module.save();

    return module;
  }

  async getModules(userId: string) {
    return this.moduleSchema.find({ userId });
  }

  async getModule(moduleId: string, userId: string) {
    const module = await this.moduleSchema.findOne({ id: moduleId, userId });
    if (!module) throw new BadRequestException('Module is not defined');
    return module;
  }

  async updateModule(dto: ModuleUpdDto, moduleId: string, userId: string) {
    const module = await this.getModule(moduleId, userId);
    module.title = dto.title ? dto.title : module.title;
    module.description = dto.description ? dto.description : module.description;

    await module.save();
    return model;
  }

  async deleteModule(moduleId: string, userId: string) {
    await this.moduleSchema.deleteOne({ id: moduleId, userId });
    return true;
  }
}
