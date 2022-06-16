import {config} from  'dotenv';
import path from 'path';

config({
  debug: true,
  path: path.resolve(__dirname, '..', '..', '..', '.env')
})
export const env = process.env;
