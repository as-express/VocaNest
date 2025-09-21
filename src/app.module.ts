import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ModuleModule } from './modules/module/module.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TextModule } from './modules/text/text.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ModuleModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
