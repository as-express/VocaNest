import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { textSchema } from 'src/database/schemas/text.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Text', schema: textSchema }])],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}
