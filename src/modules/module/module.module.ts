import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { moduleSchema } from 'src/database/schemas/module.schema';
import { textSchema } from 'src/database/schemas/text.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Module', schema: moduleSchema }]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
