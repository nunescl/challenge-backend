import { Request } from 'express';
import { diskStorage, FileFilterCallback, Options, StorageEngine } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';
import { HttpException } from '../../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../../utils/enums/http-status.enum';
import { env } from '../environment-variables';

const directory = resolve(__dirname, '..', 'dist', 'uploads')
const storageTypes: Record<string, StorageEngine> = {
  local: diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: any) => {
      cb(null, directory);
    },
    filename: (_req, file: Express.Multer.File, cb: any) => {
      randomBytes(16, (err: Error | null, hash: Buffer) => {
        file.filename = `${hash.toString('hex')}-${file.originalname}`;
        if (err) cb(err, file.filename);
        cb(null, file.filename);
      });
    },
  }),
};

export const multerConfig = {
  dest: directory,
  storage: storageTypes[env.STORAGE_TYPE ?? 'local'],
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (
    _request: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else
      cb(
        new HttpException(
          'Arquivo com formato inválido!',
          HttpStatus.BAD_REQUEST,
        ),
      );
  },
} as Options;
