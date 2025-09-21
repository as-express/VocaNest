import { Injectable } from '@nestjs/common';
import { TextTranslateDto } from './modules/text/dto/translate.dto';
import translate = require('@vitalets/google-translate-api');

Injectable();
export class AppService {
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
