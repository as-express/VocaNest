import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TextDto } from './dto/text.dto';
import { Text } from 'src/database/schemas/text.schema';
import pkg from '@vitalets/google-translate-api';
import { TextUpdDto } from './dto/text.upd';
const translate = pkg.translate;

@Injectable()
export class TextService {
  constructor(
    @InjectModel(Text.name) private readonly textSchema: Model<Text>,
  ) {}

  async newText(dto: TextDto, moduleId: string) {
    const isHave = await this.textSchema.findOne({ moduleId });
    if (isHave) throw new BadRequestException('Text is already exists');

    const translation = await translate(dto.textFrom, {
      from: dto.from,
      to: dto.to,
    });

    const text = await this.textSchema.create({
      ...dto,
      moduleId,
      textTo: translation.text,
    });

    await text.save();
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
    return await this.textSchema.findByIdAndDelete(textId);
  }
}
