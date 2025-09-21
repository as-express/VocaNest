import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TextDto } from './dto/text.dto';
import { Text } from 'src/database/schemas/text.schema';
import { TextUpdDto } from './dto/text.upd';
import translate = require('@vitalets/google-translate-api');
import { TextTranslateDto } from './dto/translate.dto';
import { Module } from 'src/database/schemas/module.schema';
import { ModuleService } from '../module/module.service';

@Injectable()
export class TextService {
  constructor(
    @InjectModel(Text.name) private readonly textSchema: Model<Text>,
    @InjectModel(Module.name) private readonly moduleSchema: Model<Module>,
    private readonly moduleService: ModuleService,
  ) {}

  async newText(dto: TextDto, moduleId: string) {
    const isHave = await this.textSchema.findOne({ textFrom: dto.textFrom });
    if (isHave) throw new BadRequestException('Text is already exists');

    const translation = await translate.translate(dto.textFrom, {
      from: dto.from,
      to: dto.to,
    });

    const text = await this.textSchema.create({
      ...dto,
      moduleId,
      textTo: translation.text,
    });

    await text.save();
    await this.moduleService.pushAndUnPush(text.id, moduleId, true);
    return text;
  }

  async getTexts(moduleId: string) {
    return await this.textSchema.find({ moduleId });
  }

  async getText(textId: string) {
    const text = await this.textSchema.findById(textId);
    if (!text) throw new BadRequestException('Text is not defined');
    return text;
  }

  async updateText(textId: string, dto: TextUpdDto) {
    const module = await this.getText(textId);
    module.textTo = dto.textTo ? dto.textTo : module.textTo;

    await module.save();
    return module;
  }

  async deleteText(textId: string) {
    const text = await this.getText(textId);
    await this.moduleService.pushAndUnPush(
      text.id,
      text.moduleId.toString(),
      false,
    );
    await this.textSchema.findByIdAndDelete(textId);
    return true;
  }

  async translate(dto: TextTranslateDto) {
    const translation = await translate.translate(dto.text, {
      from: dto.from,
      to: dto.to,
    });

    return {
      text: translation.text,
    };
  }
}
