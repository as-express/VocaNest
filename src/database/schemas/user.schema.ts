import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: 'admin' | 'user';

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Module' }], default: [] })
  texts: Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
