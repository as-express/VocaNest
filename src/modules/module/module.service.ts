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

  async getModule(moduleId: string) {
    const module = await this.moduleSchema.findById(moduleId).populate('texts');
    if (!module) throw new BadRequestException('Module is not defined');
    return module;
  }

  async updateModule(dto: ModuleUpdDto, moduleId: string) {
    const module = await this.getModule(moduleId);
    module.title = dto.title ? dto.title : module.title;
    module.description = dto.description ? dto.description : module.description;

    await module.save();
    return true;
  }

  async deleteModule(moduleId: string) {
    await this.moduleSchema.findByIdAndDelete(moduleId);
    return true;
  }

  async pushAndUnPush(textId: string, moduleId: string, isPush: boolean) {
    if (isPush) {
      await this.moduleSchema.findByIdAndUpdate(moduleId, {
        $push: { texts: textId },
        $inc: { textCount: 1 },
      });
    } else {
      await this.moduleSchema.findByIdAndUpdate(moduleId, {
        $pull: { texts: textId },
        $inc: { textCount: -1 },
      });
    }
  }

  async getQuiz(moduleId: string) {
    const module = await this.moduleSchema.findById(moduleId).populate('texts');
    if (!module) throw new BadRequestException('Module not found');

    const texts: any = module.texts;
    if (!texts.length) throw new BadRequestException('Module has no texts');

    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const correctAnswer = randomText.textTo;

    const wrongOptions = texts
      .filter((t) => t._id.toString() !== randomText._id.toString())
      .map((t) => t.textTo);
    const options = [correctAnswer, ...this.shuffle(wrongOptions).slice(0, 3)];
    const shuffledOptions = this.shuffle(options);

    return {
      question: randomText.textFrom,
      options: shuffledOptions,
      correctAnswer,
    };
  }

  private shuffle<T>(array: T[]): T[] {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
}
