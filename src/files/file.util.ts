import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const fileNameEditor = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: any, filename) => void,
) => {
  const newFileName = file.originalname;

  callback(null, newFileName);
};

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: any, valid: boolean) => void,
) => {
  console.log(file);
  const regex = /\.(jpg|jpeg|png|bmp)$/i;
  if (!file.originalname || !file.originalname.match(regex)) {
    return callback(
      new BadRequestException('File must be of type jpg|jpeg|png|bmp'),
      false,
    );
  }

  callback(null, true);
};
