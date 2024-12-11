import { BadRequestException, Injectable } from '@nestjs/common';
import { Storage, Bucket } from '@google-cloud/storage';

import * as dotenv from 'dotenv';

dotenv.config();
const credential = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

@Injectable()
export class GoogleServiceStorage {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({ credentials: credential });
    this.bucket = this.storage.bucket('huyenvo--portfolio');
    if (credential.private_key) {
      credential.private_key = credential.private_key.replace(/\\n/g, '\n'); 
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const blob = this.bucket.file(file.originalname);

    if (!file.buffer) {
      console.error('Invalid file buffer:', file);
      throw new BadRequestException('File buffer is undefined');
    }

    try {
      await blob.save(file.buffer, {
        contentType: file.mimetype,
      });

      return {
        publicUrl: `https://storage.cloud.google.com/${this.bucket.name}/${blob.name}`,
      };
    } catch (err) {
      throw new BadRequestException(err?.message);
    }
  }
}
