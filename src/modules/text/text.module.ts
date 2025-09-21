import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { textSchema } from 'src/database/schemas/text.schema';
import { moduleSchema } from 'src/database/schemas/module.schema';
import { ModuleService } from '../module/module.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Text', schema: textSchema },
      { name: 'Module', schema: moduleSchema },
    ]),
  ],
  controllers: [TextController],
  providers: [TextService, ModuleService],
})
export class TextModule {}
