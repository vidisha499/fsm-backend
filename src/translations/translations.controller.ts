// import { Controller } from '@nestjs/common';

// @Controller('translations')
// export class TranslationsController {}

import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('translations')
export class TranslationsController {


  @Get(':lang')
getTranslation(@Param('lang') lang: string, @Res() res: Response) {
  const fileName = lang.endsWith('.json') ? lang : `${lang}.json`;
  
  // Try SRC first during development
  const srcPath = join(process.cwd(), 'src', 'assets', 'i18n', fileName);
  
  if (existsSync(srcPath)) {
    return res.sendFile(srcPath);
  }

  // Fallback to DIST
  const filePath = join(process.cwd(), 'dist', 'assets', 'i18n', fileName);
  if (existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  console.error(`Translation file not found: ${fileName}`);
  return res.status(404).json({ message: 'Translation file not found' });

  res.setHeader('Content-Type', 'application/json'); // Add this line
  return res.sendFile(srcPath);
}
}